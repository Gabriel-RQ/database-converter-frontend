<script lang="ts">
  import {
    ArrowRightIcon,
    FileCodeIcon,
    ChevronRightIcon,
  } from "@lucide/svelte";
  import { Input, TextButton } from "$lib/components";
  import type { PageProps } from "./$types";
  import SelectInput from "$lib/components/inputs/SelectInput.svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  const sgbds = [
    { value: "postgres", label: "Postgres" },
    { value: "firebird", label: "Firebird" },
  ];

  let { data }: PageProps = $props();
</script>

<div class="flex justify-between items-center gap-8">
  <div class="card space-y-3 flex-1">
    <h3 class="title font-normal">Base de dados origem</h3>
    <SelectInput class="h-12" label="SGBD" items={sgbds} />
    <Input class="h-12" label="Nome/identificador da base de dados" />
    <Input class="h-12" label="Senha da base de dados" />
    <Input class="h-12" label="Usuário da base de dados" />
    <Input class="h-12" label="Porta da base de dados" />
  </div>

  <ArrowRightIcon class="stroke-primary size-16" />

  <div class="card space-y-3 flex-1">
    <h3 class="title font-normal">Base de dados destino</h3>
    <SelectInput class="h-12" label="SGBD" items={sgbds} />
    <Input class="h-12" label="Nome/identificador da base de dados" />
    <Input class="h-12" label="Senha da base de dados" />
    <Input class="h-12" label="Usuário da base de dados" />
    <Input class="h-12" label="Porta da base de dados" disabled />
  </div>
</div>

<span class="flex justify-between items-baseline px-4">
  <TextButton>
    <FileCodeIcon class="size-5 mr-2" />
    Editar DDL
  </TextButton>

  <TextButton onclick={() => goto(page.url.pathname + "/status")}>
    Iniciar Migração
    <ChevronRightIcon class="size-5" />
  </TextButton>
</span>
