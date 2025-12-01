<script lang="ts">
  import {
    ArrowDownIcon,
    ArrowRightIcon,
    ChevronRightIcon,
  } from "@lucide/svelte";
  import { MigrationFormFields, TextButton } from "$lib/components";
  import { enhance } from "$app/forms";
  import { page } from "$app/state";

  const migrationIdentifier = page.url.searchParams.get("identifier");
</script>

<form
  method="post"
  use:enhance
  class="flex flex-col gap-2 justify-start items-center md:flex-row md:justify-between md:items-center md:gap-8"
  id="migration-form"
>
  <input type="hidden" name="migrationIdentifier" value={migrationIdentifier} />

  <MigrationFormFields {migrationIdentifier} namePrefix="origin" />

  <ArrowRightIcon class="stroke-primary size-16 hidden md:block" />
  <ArrowDownIcon class="stroke-primary size-16 md:hidden block" />

  <MigrationFormFields {migrationIdentifier} namePrefix="target" />
</form>

<span class="flex justify-end items-center px-4">
  <TextButton type="submit" form="migration-form">
    Iniciar Migração
    <ChevronRightIcon class="size-5" />
  </TextButton>
</span>
