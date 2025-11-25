<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  type TextButtonProps = HTMLButtonAttributes & {
    children: Snippet<[]>;
  };
  let { children, ...restProps }: TextButtonProps = $props();
</script>

<button
  class="text-primary text-xl inline-flex items-center cursor-pointer hover:text-secondary transition-colors duration-200 outline-primary"
  {...restProps}
>
  {@render children()}
</button>
