<script>
  import { MigrationProgressBar, ProgressLog } from "$lib/components";
  import { LoaderCircleIcon } from "@lucide/svelte";
</script>

<div class="card w-4/5 mx-auto">
  <div class="text-center space-y-3 mb-14">
    <LoaderCircleIcon
      class="m-auto text-accent animate-spin size-22 stroke-1"
    />
    <h3 class="font-bold text-xl text-accent">Migração em andamento</h3>
    <p>Você pode acompanhar o progresso abaixo</p>
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
