<script lang="ts">
  import { ArrowRightIcon, ChevronRightIcon } from "@lucide/svelte";
  import { MigrationFormFields, TextButton } from "$lib/components";
  import { enhance } from "$app/forms";
  import { page } from "$app/state";

  const migrationIdentifier = page.url.searchParams.get("identifier");
</script>

<form
  method="post"
  use:enhance
  class="flex justify-between items-center gap-8"
  id="migration-form"
>
  <input type="hidden" name="migrationIdentifier" value={migrationIdentifier} />

  <MigrationFormFields {migrationIdentifier} namePrefix="origin" />

  <ArrowRightIcon class="stroke-primary size-16" />

  <MigrationFormFields {migrationIdentifier} namePrefix="target" />
</form>

<span class="flex justify-end items-center px-4">
  <TextButton type="submit" form="migration-form">
    Iniciar Migração
    <ChevronRightIcon class="size-5" />
  </TextButton>
</span>
