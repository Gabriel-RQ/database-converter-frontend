<script lang="ts">
  import ProgressBar from "./ProgressBar.svelte";

  type ProgressBarProps = {
    class?: string;
  };

  let { class: className }: ProgressBarProps = $props();
</script>

<div class="flex *:flex-1 gap-4 {className}">
  <ProgressBar label="Extração" progress={100} />
  <ProgressBar label="Transformação" />
  <ProgressBar label="Carga" />
  <ProgressBar label="Validação" />
</div>
