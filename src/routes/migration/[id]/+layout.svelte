<script lang="ts">
  import { goto } from "$app/navigation";
  import { StatusBadge, TextButton } from "$lib/components";
  import { ChevronLeftIcon } from "@lucide/svelte";
  import type { LayoutProps } from "./$types";

  let { children, data }: LayoutProps = $props();
</script>

<section class="base-section">
  <div class="space-y-8 w-7/10">
    <span class="inline-flex gap-9 w-full">
      <TextButton onclick={() => goto("/")}>
        <ChevronLeftIcon class="size-8" />
        Início
      </TextButton>
      <h2 class="title">Migração Teste ({data.id})</h2>

      <StatusBadge status="pending" class="ml-auto" />
    </span>

    {@render children()}
  </div>
</section>
