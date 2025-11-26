<script lang="ts">
  import {
    ArrowRightIcon,
    FileCodeIcon,
    ChevronRightIcon,
  } from "@lucide/svelte";
  import { Input, TextButton } from "$lib/components";
  import SelectInput from "$lib/components/inputs/SelectInput.svelte";
  import { enhance } from "$app/forms";
  import { page } from "$app/state";

  const sgbds = [
    { value: "POSTGRES", label: "Postgres" },
    { value: "FIREBIRD", label: "Firebird" },
  ];

  const migrationIdentifier = page.url.searchParams.get("identifier");
</script>

<form
  method="post"
  use:enhance
  class="flex justify-between items-center gap-8"
  id="migration-form"
>
  <input type="hidden" name="migrationIdentifier" value={migrationIdentifier} />

  <div class="card space-y-3 flex-1">
    <h3 class="title font-normal">Base de dados origem</h3>
    <SelectInput class="h-12" label="SGBD" items={sgbds} name="originSgbd" />
    <Input
      class="h-12"
      label="Nome/identificador da base de dados"
      name="originDbname"
      minlength={1}
      value={migrationIdentifier}
    />
    <Input
      class="h-12"
      label="Senha da base de dados"
      name="originDbpassword"
      minlength={1}
      type="password"
    />
    <Input
      class="h-12"
      label="Usuário da base de dados"
      name="originDbuser"
      minlength={1}
    />
    <Input
      class="h-12"
      label="Host da base de dados"
      name="originDbhost"
      value="localhost"
    />
    <Input class="h-12" label="Porta da base de dados" name="originDbport" />
  </div>

  <ArrowRightIcon class="stroke-primary size-16" />

  <div class="card space-y-3 flex-1">
    <h3 class="title font-normal">Base de dados destino</h3>
    <SelectInput class="h-12" label="SGBD" items={sgbds} name="targetSgbd" />
    <Input
      class="h-12"
      label="Nome/identificador da base de dados"
      name="targetDbname"
      minlength={1}
      value={migrationIdentifier}
    />
    <Input
      class="h-12"
      label="Senha da base de dados"
      name="targetDbpassword"
      minlength={1}
      type="password"
    />
    <Input
      class="h-12"
      label="Usuário da base de dados"
      name="targetDbuser"
      minlength={1}
    />
    <Input
      class="h-12"
      label="Host da base de dados"
      name="targetDbhost"
      value="localhost"
    />
    <Input
      class="h-12"
      label="Porta da base de dados"
      name="targetDbport"
      disabled
    />
  </div>
</form>

<span class="flex justify-end items-baseline px-4">
  <!-- <TextButton>
    <FileCodeIcon class="size-5 mr-2" />
    Editar DDL
  </TextButton> -->

  <TextButton type="submit" form="migration-form">
    Iniciar Migração
    <ChevronRightIcon class="size-5" />
  </TextButton>
</span>
