<script lang="ts">
  import { MigrationProgressBar, ProgressLog } from "$lib/components";
  import { CheckIcon, LoaderCircleIcon } from "@lucide/svelte";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  let migrationStatus =
    getContext<() => Writable<EMigrationStatus>>("migration:status")();

  setTimeout(() => migrationStatus.set("processing"), 1000);
  setTimeout(() => migrationStatus.set("done"), 2000);
</script>

<div class="card w-4/5 mx-auto">
  <div
    class="text-center space-y-3 mb-14"
    class:text-accent={$migrationStatus === "processing"}
    class:text-secondary={$migrationStatus === "done"}
  >
    {#if $migrationStatus === "processing"}
      <LoaderCircleIcon
        class="m-auto animate-spin size-22 stroke-1 transition-all"
      />
    {:else if $migrationStatus === "done"}
      <CheckIcon class="m-auto size-22 stroke-1 transition-all" />
    {/if}
    <h3 class="font-bold text-xl transition-all">Migração em andamento</h3>
    <p class="text-text">Você pode acompanhar o progresso abaixo</p>
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
