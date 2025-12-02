<script lang="ts">
  import { page } from "$app/state";
  import {
    getSseEvents,
    startExtraction,
    startLoading,
    startTransformation,
    startValidation,
  } from "$lib/api";
  import {
    DDLDialog,
    MigrationProgressBar,
    MigrationStatusHeader,
    ProgressLog,
    TextButton,
  } from "$lib/components";
  import {
    parseMigrationLog,
    parseMigrationStatusDescription,
  } from "$lib/util";
  import { ChevronRightIcon, FileCodeIcon } from "@lucide/svelte";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const migrationStatus =
    getContext<() => Writable<MigrationStatusContext>>("migration:status")();

  let currentEventSource: EventSource | null = null;
  let isWaitingConfirmation = $state(false);

  const migrationLogs: string[] = $state([]);
  const progressLog = $state({
    extractionProgress: 0,
    transformationProgress: 0,
    loadProgress: 0,
    validationProgress: 0,
  });

  function confirmLoad() {
    startLoading(fetch, page.params.id as string);
    isWaitingConfirmation = false;
  }

  function orchestrate(id: string) {
    if (currentEventSource) {
      currentEventSource.close();
    }

    migrationLogs.length = 0;
    isWaitingConfirmation = false;

    migrationStatus.update((v) => ({
      ...v,
      id,
      name: data.status.name,
    }));

    const events = getSseEvents(id);
    currentEventSource = events;

    events.addEventListener("open", () => {
      if (data.status.step === "START") {
        startExtraction(fetch, id);
      }
    });

    const errorHandler = () => {
      events.close();
      migrationStatus.update((v) => ({
        ...v,
        status: "error",
      }));
      isWaitingConfirmation = false;
    };

    events.addEventListener("shutdown", (event) => {
      errorHandler();
      migrationLogs.push(event.data);
    });

    events.addEventListener("error", errorHandler);

    events.addEventListener("status", (event) => {
      const status = JSON.parse(event.data) as MigrationStatusResponse;
      const statusDescription = parseMigrationStatusDescription(status.step);
      migrationStatus.update((v) => ({
        ...v,
        status: statusDescription,
      }));

      switch (status.step) {
        case "EXTRACTION_FINISHED":
          startTransformation(fetch, id);
          progressLog.extractionProgress = 100;
          break;
        case "TRANSFORMATION_FINISHED":
        case "WAITING_FOR_LOAD_CONFIRMATION":
          isWaitingConfirmation = true;
          progressLog.transformationProgress = 100;
          break;
        case "LOAD_FINISHED":
          startValidation(fetch, id);
          progressLog.loadProgress = 100;
          break;
        case "FINISHED":
        case "ERROR":
          progressLog.validationProgress = 100;
          events.close();
          break;
      }

      migrationLogs.push(parseMigrationLog(status));
    });

    return () => {
      events.close();
      currentEventSource = null;
    };
  }

  $effect(() => {
    const id = page.params.id;
    if (id === undefined) return;

    return orchestrate(id);
  });
</script>

<div class="card w-full md:w-4/5 mx-auto overflow-y-auto">
  <MigrationStatusHeader status={$migrationStatus.status} />

  <MigrationProgressBar
    class="mb-8"
    {...progressLog}
    status={$migrationStatus.status}
  />

  <ProgressLog logs={migrationLogs} />

  <span class="flex justify-between items-center md:px-4 mt-4">
    <DDLDialog id={data.status.id}>
      {#snippet trigger({ props })}
        <TextButton {...props} disabled={!isWaitingConfirmation}>
          <FileCodeIcon class="size-5 mr-2" />
          Editar DDL
        </TextButton>
      {/snippet}
    </DDLDialog>

    <TextButton
      type="submit"
      form="migration-form"
      disabled={!isWaitingConfirmation}
      onclick={confirmLoad}
    >
      Prosseguir
      <ChevronRightIcon class="size-5" />
    </TextButton>
  </span>
</div>
