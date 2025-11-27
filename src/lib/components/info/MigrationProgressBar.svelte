<script lang="ts">
  import ProgressBar from "./ProgressBar.svelte";

  type ProgressBarProps = {
    class?: string;
    status: EMigrationStatus;
    extractionProgress?: number;
    transformationProgress?: number;
    loadProgress?: number;
    validationProgress?: number;
  };

  let {
    class: className,
    status,
    extractionProgress = 0,
    transformationProgress = 0,
    loadProgress = 0,
    validationProgress = 0,
  }: ProgressBarProps = $props();
</script>

<div class="flex *:flex-1 gap-4 {className}">
  <ProgressBar label="Extração" progress={extractionProgress} {status} />
  <ProgressBar
    label="Transformação"
    progress={transformationProgress}
    {status}
  />
  <ProgressBar label="Carga" progress={loadProgress} {status} />
  <ProgressBar label="Validação" progress={validationProgress} {status} />
</div>
