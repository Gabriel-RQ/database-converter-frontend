<script lang="ts">
  type ProgressLogProps = {
    logs?: string[];
  };

  let { logs = [] }: ProgressLogProps = $props();
</script>

<div
  class="base-border rounded-lg bg-background min-h-70 max-h-80 px-5 py-4 flex flex-col gap-3 overflow-y-auto"
>
  {#each logs as log}
    <span
      class="font-inconsolata relative before:w-1 before:bg-text before:rounded-full before:h-9/10 before:absolute before:top-1/2 before:-translate-y-1/2 before:-translate-x-4 pl-4"
    >
      {log}
    </span>
  {/each}
</div>
