<script lang="ts">
  import { CheckIcon, MinusIcon } from "@lucide/svelte";
  import { Checkbox, Label, type WithoutChildren } from "bits-ui";

  type CheckboxProps = WithoutChildren<{
    label: string;
    checked?: boolean;
    name?: string;
  }>;

  let { label, checked = $bindable(false), name }: CheckboxProps = $props();

  const id = $props.id();
</script>

<div class="flex items-center space-x-2">
  <Checkbox.Root
    {id}
    {name}
    aria-labelledby="{id}-label"
    indeterminate
    bind:checked
    class="rounded-sm shadow-base base-border border-text-dimmed bg-alt-background data-[state=unchecked]:shadow-none data-[state=unchecked]:bg-text-dimmed data-[state=unchecked]:border-alt-background data-[state=unchecked]:hover:border-black/50 inline-flex size-6 items-center justify-center transition-all"
  >
    {#snippet children({ checked, indeterminate })}
      <div class="text-text inline-flex items-center justify-center">
        {#if indeterminate}
          <MinusIcon class="size-4" />
        {:else if checked}
          <CheckIcon class="size-4" />
        {/if}
      </div>
    {/snippet}
  </Checkbox.Root>

  <Label.Root id="{id}-label" for={id} class="text-sm font-medium leading-none"
    >{label}</Label.Root
  >
</div>
