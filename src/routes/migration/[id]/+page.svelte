<script lang="ts">
  import {
    ChevronLeftIcon,
    ArrowRightIcon,
    FileCodeIcon,
    ChevronRightIcon,
  } from "@lucide/svelte";
  import { Input, TextButton } from "$lib/components";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<div class="flex justify-between items-center gap-8">
  <div class="card space-y-3">
    <h3 class="title font-normal">Base de dados origem</h3>
    <Input class="h-12" label="SGBD" />
    <Input class="h-12" label="Nome/identificador da base de dados" />
    <Input class="h-12" label="Senha da base de dados" />
    <Input class="h-12" label="Usuário da base de dados" />
    <Input class="h-12" label="Porta da base de dados" />
  </div>

  <ArrowRightIcon class="stroke-primary size-64" />

  <div class="card space-y-3">
    <h3 class="title font-normal">Base de dados destino</h3>
    <Input class="h-12" label="SGBD" />
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

  <TextButton>
    Iniciar Migração
    <ChevronRightIcon class="size-5" />
  </TextButton>
</span>
