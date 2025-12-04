<script>
  import { goto } from "$app/navigation";
  import { Input, ProceedButton } from "$lib/components";

  let name = $state("");
</script>

<section class="base-section items-center">
  <div class="md:size-1/3 space-y-6">
    <h2 class="title">Iniciar migração</h2>
    <p>
      Transfira dados entre diferentes Sistemas Gerenciadores de Bases de Dados
      (SGBDs) de maneira automatizada.
    </p>

    <form
      class="h-16 gap-4 flex"
      onsubmit={(event) => {
        event.preventDefault();
        goto(`/migration?identifier=${name}`);
      }}
    >
      <Input
        placeholder="Identificador"
        name="identifier"
        minlength={1}
        bind:value={name}
      />
      <ProceedButton type="submit" disabled={name.length === 0} />
    </form>
  </div>
</section>
