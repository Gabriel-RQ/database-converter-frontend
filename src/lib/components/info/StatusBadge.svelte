<script lang="ts">
  type StatusBadgeProps = {
    status: EMigrationStatus;
    class?: string;
  };

  let { status, class: className }: StatusBadgeProps = $props();

  let description = $derived(
    status === "pending"
      ? "Pendente"
      : status === "processing" || status === "confirmation"
        ? "Executando"
        : status === "error"
          ? "Erro"
          : "Finalizado"
  );
</script>

<div
  class="w-fit h-8 p-2 inline-flex items-center justify-start gap-1.5 alt-background rounded-full overflow-hidden {className}"
>
  <div
    class="rounded-full size-4 min-w-4"
    class:bg-text={status === "pending"}
    class:bg-accent={status === "processing" || status === "confirmation"}
    class:bg-error={status === "error"}
    class:bg-secondary={status === "done"}
  ></div>
  <p class="text-xs font-light truncate">{description}</p>
</div>
