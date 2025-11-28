<script lang="ts">
  import { goto } from "$app/navigation";
  import { StatusBadge, TextButton } from "$lib/components";
  import { ChevronLeftIcon } from "@lucide/svelte";
  import type { LayoutProps } from "./$types";
  import { setContext } from "svelte";
  import { writable, type Writable } from "svelte/store";
  import { page } from "$app/state";

  let migrationStatus: Writable<MigrationStatusContext> = writable({
    status: "pending",
  });

  setContext("migration:status", () => migrationStatus);

  const migrationIdentifier =
    $migrationStatus.name ?? page.url.searchParams.get("identifier");

  let { children }: LayoutProps = $props();
</script>

<section class="base-section">
  <div class="space-y-8 w-7/10 overflow-y-hidden">
    <span class="inline-flex gap-9 w-full">
      <TextButton
        onclick={() => goto("/")}
        disabled={$migrationStatus.status === "processing"}
      >
        <ChevronLeftIcon class="size-8" />
        Início
      </TextButton>
      <h2 class="title">
        Migração "{migrationIdentifier}" {$migrationStatus.id &&
          `(${$migrationStatus.id})`}
      </h2>

      <StatusBadge status={$migrationStatus.status} class="ml-auto" />
    </span>

    {@render children()}
  </div>
</section>
