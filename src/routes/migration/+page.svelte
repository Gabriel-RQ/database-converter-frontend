<script lang="ts">
  import {
    ArrowDownIcon,
    ArrowRightIcon,
    ChevronRightIcon,
  } from "@lucide/svelte";
  import {
    Checkbox,
    MigrationFormFields,
    TextButton,
    Tooltip,
  } from "$lib/components";
  import { enhance } from "$app/forms";
  import { page } from "$app/state";

  const migrationIdentifier = page.url.searchParams.get("identifier");
  let isAutoMigration = $state(false);
</script>

<form
  method="post"
  use:enhance
  class="flex flex-col gap-2 justify-start items-center md:flex-row md:justify-between md:items-center md:gap-8"
  id="migration-form"
>
  <input type="hidden" name="migrationIdentifier" value={migrationIdentifier} />
  <input type="hidden" name="autoMigration" value={isAutoMigration} />

  <MigrationFormFields {migrationIdentifier} namePrefix="origin" />

  <ArrowRightIcon class="stroke-primary size-16 hidden md:block" />
  <ArrowDownIcon class="stroke-primary size-16 md:hidden block" />

  <MigrationFormFields {migrationIdentifier} namePrefix="target" />
</form>

<span class="flex justify-end items-center px-4 gap-x-4">
  <span class="inline-flex gap-1">
    <Checkbox label="Migração automatizada" bind:checked={isAutoMigration} />
    <Tooltip
      content="Na migração automatizada a confirmação do usuário para a carga dos dados não será solicitada."
    />
  </span>

  <TextButton type="submit" form="migration-form">
    Iniciar Migração
    <ChevronRightIcon class="size-5" />
  </TextButton>
</span>
