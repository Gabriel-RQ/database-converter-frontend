<script lang="ts">
  import { ChevronRightIcon } from "@lucide/svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  let props: HTMLButtonAttributes = $props();
</script>

<button
  class="p-3 bg-primary rounded-md base-border cursor-pointer disabled:bg-text-dimmed hover:bg-secondary focus:bg-secondary transition-colors duration-200"
  {...props}
>
  <ChevronRightIcon class="size-8 stroke-background" />
</button>
