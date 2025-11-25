<script lang="ts">
  import ProgressBar from "./ProgressBar.svelte";

  type ProgressBarProps = {
    class?: string;
    extractionProgress?: number;
    transformationProgress?: number;
    loadProgress?: number;
    validationProgress?: number;
  };

  let {
    class: className,
    extractionProgress = 0,
    transformationProgress = 0,
    loadProgress = 0,
    validationProgress = 0,
  }: ProgressBarProps = $props();
</script>

<div class="flex *:flex-1 gap-4 {className}">
  <ProgressBar label="Extração" progress={extractionProgress} />
  <ProgressBar label="Transformação" progress={transformationProgress} />
  <ProgressBar label="Carga" progress={loadProgress} />
  <ProgressBar label="Validação" progress={validationProgress} />
</div>
