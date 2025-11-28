<script lang="ts">
  import { ChevronLeftIcon, ChevronRightIcon } from "@lucide/svelte";
  import { Pagination } from "bits-ui";

  type PaginationProps = {
    count: number;
    perPage: number;
    page: number;
    class?: string;
  };

  let {
    count,
    perPage,
    page = $bindable(),
    class: className,
  }: PaginationProps = $props();
</script>

<Pagination.Root {count} {perPage} bind:page>
  {#snippet children({ pages, range })}
    <div class="flex items-center justify-center gap-3 {className}">
      <Pagination.PrevButton
        class="size-10 hover:bg-text-dimmed hover:text-background transition-colors duration-300 inline-flex items-center justify-center rounded-md"
      >
        <ChevronLeftIcon class="size-6" />
      </Pagination.PrevButton>

      <div class="flex items-center gap-2.5">
        {#each pages as page (page.key)}
          {#if page.type === "ellipsis"}
            <div class="text-text-dimmed select-none font-medium">...</div>
          {:else}
            <Pagination.Page
              {page}
              class="data-selected:bg-secondary data-selected:text-background inline-flex items-center justify-center size-10 select-none rounded-md bg-transparent font-medium disabled:cursor-not-allowed disabled:text-text-dimmed hover:bg-text-dimmed hover:text-background transition-colors duration-300"
            >
              {page.value}
            </Pagination.Page>
          {/if}
        {/each}
      </div>

      <Pagination.NextButton
        class="size-10 hover:bg-text-dimmed hover:text-background transition-colors duration-300 inline-flex items-center justify-center rounded-md"
      >
        <ChevronRightIcon class="size-6" />
      </Pagination.NextButton>
    </div>
  {/snippet}
</Pagination.Root>
