<script lang="ts">
  import { CircleQuestionMarkIcon } from "@lucide/svelte";
  import { Tooltip, type WithChildren } from "bits-ui";
  import { fade } from "svelte/transition";

  type TooltipProps = WithChildren<{ content: string }>;

  let { content }: TooltipProps = $props();
</script>

<Tooltip.Provider>
  <Tooltip.Root delayDuration={200}>
    <Tooltip.Trigger class="shadow-base hover:text-primary">
      <CircleQuestionMarkIcon class="size-4" />
    </Tooltip.Trigger>

    <Tooltip.Content sideOffset={8} forceMount>
      {#snippet child({ open, props, wrapperProps })}
        {#if open}
          <div {...wrapperProps}>
            <div transition:fade {...props} class="card text-sm max-w-80">
              {content}
            </div>
          </div>
        {/if}
      {/snippet}
    </Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>
