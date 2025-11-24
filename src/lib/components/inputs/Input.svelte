<script lang="ts">
  import { type HTMLInputAttributes } from "svelte/elements";
  import { type WithoutChildren } from "bits-ui";

  type InputProps = WithoutChildren<HTMLInputAttributes>;

  let { class: className, type = "text", ...restProps }: InputProps = $props();
</script>

<input
  class="alt-background rounded-md w-full px-4 py-5 outline-primary {className}"
  {type}
  {...restProps}
/>
