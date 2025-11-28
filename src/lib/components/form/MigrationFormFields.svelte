<script lang="ts">
  import { getSgbdDefaults } from "$lib/util";
  import Input from "../inputs/Input.svelte";
  import SelectInput from "../inputs/SelectInput.svelte";

  type MigrationFormFieldsProps = {
    migrationIdentifier: string | null;
  };

  const sgbds = [
    { value: "POSTGRES", label: "Postgres" },
    { value: "FIREBIRD", label: "Firebird" },
  ];

  let selectedSgbd = $state("");
  let selectedDefaults = $derived(getSgbdDefaults(selectedSgbd));

  let { migrationIdentifier }: MigrationFormFieldsProps = $props();
</script>

<div class="card space-y-3 flex-1">
  <h3 class="title font-normal">Base de dados origem</h3>
  <SelectInput
    class="h-12"
    label="SGBD"
    items={sgbds}
    name="originSgbd"
    bind:value={selectedSgbd}
  />
  <Input
    class="h-12"
    label="Nome/identificador da base de dados"
    name="originDbname"
    minlength={1}
    value={migrationIdentifier}
    required
  />
  <Input
    class="h-12"
    label="Senha da base de dados"
    name="originDbpassword"
    minlength={1}
    type="password"
    value={selectedDefaults.password}
    required
  />
  <Input
    class="h-12"
    label="Usuário da base de dados"
    name="originDbuser"
    minlength={1}
    value={selectedDefaults.user}
    required
  />
  <Input
    class="h-12"
    label="Host da base de dados"
    name="originDbhost"
    value={selectedDefaults.host}
    required
  />
  <Input
    class="h-12"
    label="Porta da base de dados"
    name="originDbport"
    value={selectedDefaults.port}
    disabled={!selectedDefaults.port}
    required
  />
</div>
