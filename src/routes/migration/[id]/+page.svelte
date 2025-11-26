<script lang="ts">
  import { page } from "$app/state";
  import { MigrationProgressBar, ProgressLog } from "$lib/components";
  import { CheckIcon, LoaderCircleIcon } from "@lucide/svelte";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  let migrationStatus =
    getContext<() => Writable<{ status: EMigrationStatus; id?: string }>>(
      "migration:status"
    )();

  migrationStatus.update((v) => {
    v.id = page.params.id;
    return v;
  });

  setTimeout(
    () =>
      migrationStatus.update((v) => {
        v.status = "processing";
        return v;
      }),
    1000
  );
  setTimeout(
    () =>
      migrationStatus.update((v) => {
        v.status = "done";
        return v;
      }),
    5000
  );
</script>

<div class="card w-4/5 mx-auto">
  <div
    class="text-center space-y-3 mb-14"
    class:text-accent={$migrationStatus.status !== "done"}
    class:text-secondary={$migrationStatus.status === "done"}
  >
    {#if $migrationStatus.status !== "done"}
      <LoaderCircleIcon
        class="m-auto animate-spin size-22 stroke-1 transition-all"
      />
      <h3 class="font-bold text-xl transition-all">Migração em andamento</h3>
      <p class="text-text">Você pode acompanhar o progresso abaixo</p>
    {:else}
      <CheckIcon class="m-auto size-22 stroke-1 transition-all" />
      <h3 class="font-bold text-xl transition-all">Migração finalizada</h3>
      <p class="text-text">Você pode conferir os <i>logs</i> abaixo</p>
    {/if}
  </div>

  <MigrationProgressBar class="mb-8" />

  <ProgressLog
    logs={[
      "Iniciando extração...",
      "Iniciando transformação...",
      "Iniciando carga...",
      "Migração finalizada",
    ]}
  />
</div>
