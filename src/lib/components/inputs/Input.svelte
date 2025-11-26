<script lang="ts">
  import { type HTMLInputAttributes } from "svelte/elements";
  import { type WithoutChildren } from "bits-ui";

  type InputProps = WithoutChildren<HTMLInputAttributes> & { label?: string };

  let {
    class: className,
    label,
    type = "text",
    value = $bindable(),
    ...restProps
  }: InputProps = $props();
  const id = $props.id();
</script>

{#if label}
  <label for={restProps.id ?? id}>{label}</label>
{/if}
<input
  class="alt-background rounded-md w-full px-4 py-5 outline-primary disabled:opacity-10 disabled:bg-text {className}"
  {type}
  {id}
  bind:value
  {...restProps}
/>
