<script lang="ts">
  import {
    BadgeAlertIcon,
    BadgeQuestionMarkIcon,
    CheckIcon,
    HardDriveIcon,
    LoaderCircleIcon,
  } from "@lucide/svelte";

  type MigrationStatusHeaderProps = {
    status: EMigrationStatus;
  };
  let { status }: MigrationStatusHeaderProps = $props();
</script>

<div
  class="text-center space-y-3 mb-14"
  class:text-text-dimmed={status === "pending"}
  class:text-text={status === "confirmation"}
  class:text-accent={status === "processing"}
  class:text-error={status === "error"}
  class:text-secondary={status === "done"}
>
  {#if status == "pending"}
    <HardDriveIcon
      class="m-auto animate-pulse size-22 stroke-1 transition-all"
    />
    <h3 class="font-bold text-xl transition-all animate-pulse">
      Inicializando a migração...
    </h3>
    <p class="text-text">Aguarde um momento, estamos preparando tudo</p>
  {:else if status === "processing"}
    <LoaderCircleIcon
      class="m-auto animate-spin size-22 stroke-1 transition-all"
    />
    <h3 class="font-bold text-xl transition-all">Migração em andamento</h3>
    <p class="text-text">Você pode acompanhar o progresso abaixo</p>
  {:else if status === "error"}
    <BadgeAlertIcon class="m-auto size-22 stroke-1 transition-all" />
    <h3 class="font-bold text-xl transition-all">
      Migração finalizada com erro
    </h3>
    <p class="text-text">Você pode conferir os <i>logs</i> abaixo</p>
  {:else if status === "confirmation"}
    <BadgeQuestionMarkIcon
      class="m-auto size-22 stroke-1 transition-all animate-bounce"
    />
    <h3 class="font-bold text-xl transition-all">
      Deseja continuar para a etapa de carga dos dados?
    </h3>
    <p class="text-text">Você pode conferir e modificar o DDL antes</p>
  {:else if status === "done"}
    <CheckIcon class="m-auto size-22 stroke-1 transition-all" />
    <h3 class="font-bold text-xl transition-all">Migração finalizada</h3>
    <p class="text-text">Você pode conferir os <i>logs</i> abaixo</p>
  {/if}
</div>
