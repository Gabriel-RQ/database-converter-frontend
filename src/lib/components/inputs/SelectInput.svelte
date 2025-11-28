<script lang="ts">
  import {
    CheckIcon,
    ChevronDownIcon,
    ChevronsUpDownIcon,
    ChevronUpIcon,
  } from "@lucide/svelte";
  import { Select, type WithoutChildren } from "bits-ui";
  import type { HTMLSelectAttributes } from "svelte/elements";

  type SelectInputProps = WithoutChildren<HTMLSelectAttributes> & {
    items: { value: string; label: string }[];
    label?: string;
  };

  let {
    items,
    class: className,
    label,
    name,
    required,
    value = $bindable(""),
  }: SelectInputProps = $props();

  const id = $props.id();
  const selectedLabel = $derived(
    value
      ? items.find((item) => item.value === value)?.label
      : "Escolha o SGBD..."
  );
</script>

{#if label}
  <label for={id}>{label}</label>
{/if}
<Select.Root
  type="single"
  {items}
  bind:value
  name={name ?? undefined}
  required={required ?? undefined}
>
  <Select.Trigger
    class="alt-background rounded-md w-full px-4 py-5 outline-primary disabled:opacity-10 disabled:bg-text inline-flex items-center justify-between data-placeholder:text-text-dimmed {className}"
    {id}
  >
    {selectedLabel}
    <ChevronsUpDownIcon class="size-6 stroke-text" />
  </Select.Trigger>

  <Select.Portal>
    <Select.Content
      class="card w-(--bits-select-anchor-width) min-w-(--bits-select-anchor-width) max-h-(--bits-select-content-available-height) select-none px-4 py-3"
      sideOffset={10}
    >
      <Select.ScrollUpButton class="flex w-full items-center justify-center">
        <ChevronUpIcon class="size-3" />
      </Select.ScrollUpButton>

      <Select.Viewport>
        {#each items as item}
          <Select.Item
            value={item.value}
            label={item.label}
            class="rounded-lg p-2 data-highlighted:base-border data-highlighted:bg-background outline-hidden border border-alt-background flex justify-between"
          >
            {#snippet children({ selected })}
              {item.label}
              {#if selected}
                <div class="ml-auto">
                  <CheckIcon aria-label="check" />
                </div>
              {/if}
            {/snippet}
          </Select.Item>
        {/each}
      </Select.Viewport>

      <Select.ScrollDownButton class="flex w-full items-center justify-center">
        <ChevronDownIcon class="size-3" />
      </Select.ScrollDownButton>
    </Select.Content>
  </Select.Portal>
</Select.Root>
