<script lang="ts">
  import { Progress } from "bits-ui";
  import { cubicInOut } from "svelte/easing";
  import { Tween } from "svelte/motion";

  type ProgressBarProps = {
    label: string;
    progress?: number;
    status: EMigrationStatus;
  };

  const id = $props.id();

  let { label, progress = 0, status }: ProgressBarProps = $props();

  const tween = new Tween(progress, { duration: 1000, easing: cubicInOut });

  $effect(() => {
    tween.set(progress);
  });
</script>

<div
  class="flex flex-col gap-1"
  class:text-accent={progress > 0 && status !== "error"}
  class:text-text-dimmed={progress === 0 && status !== "error"}
  class:text-secondary={status === "done"}
  class:text-error={status === "error"}
>
  <span {id} class="text-center font-semibold text-current text-base"
    >{label}</span
  >

  <Progress.Root
    aria-labelledby={id}
    value={Math.round(tween.current)}
    max={100}
    class="bg-text-dimmed w-full h-3 rounded-full overflow-hidden"
  >
    <div
      class="bg-current h-full w-full flex-1 rounded-full"
      style={`transform: translateX(-${100 - (100 * (tween.current ?? 0)) / 100}%)`}
    ></div>
  </Progress.Root>
</div>
