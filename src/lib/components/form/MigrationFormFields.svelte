<script lang="ts">
  import { getSgbdDefaults } from "$lib/util";
  import Input from "../inputs/Input.svelte";
  import SelectInput from "../inputs/SelectInput.svelte";

  type MigrationFormFieldsProps = {
    migrationIdentifier: string | null;
    namePrefix: string;
  };

  const sgbds = [
    { value: "POSTGRES", label: "Postgres" },
    { value: "FIREBIRD", label: "Firebird" },
  ];

  let selectedSgbd = $state("");
  let selectedDefaults = $derived(getSgbdDefaults(selectedSgbd));

  let { migrationIdentifier, namePrefix }: MigrationFormFieldsProps = $props();
</script>

<div class="card space-y-3 flex-1">
  <h3 class="title font-normal">Base de dados origem</h3>
  <SelectInput
    class="h-12"
    label="SGBD"
    items={sgbds}
    name="{namePrefix}Sgbd"
    bind:value={selectedSgbd}
  />
  <Input
    class="h-12"
    label="Nome/identificador da base de dados"
    name="{namePrefix}Dbname"
    minlength={1}
    value={migrationIdentifier}
    required
  />
  <Input
    class="h-12"
    label="Senha da base de dados"
    name="{namePrefix}Dbpassword"
    minlength={1}
    type="password"
    value={selectedDefaults.password}
    required
  />
  <Input
    class="h-12"
    label="Usuário da base de dados"
    name="{namePrefix}Dbuser"
    minlength={1}
    value={selectedDefaults.user}
    required
  />
  <Input
    class="h-12"
    label="Host da base de dados"
    name="{namePrefix}Dbhost"
    value={selectedDefaults.host}
    required
  />
  <Input
    class="h-12"
    label="Porta da base de dados"
    name="{namePrefix}Dbport"
    value={selectedDefaults.port}
    disabled={!selectedDefaults.port}
    type="number"
    required
  />
</div>
