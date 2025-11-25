<script>
  import { goto } from "$app/navigation";
  import { Input, ProceedButton } from "$lib/components";
</script>

<section class="base-section">
  <div class="size-1/3 space-y-6">
    <h2 class="title">Iniciar migração</h2>
    <p>
      Transfira dados entre diferentes Sistemas Gerenciadores de Bases de Dados
      (SGBDs) de maneira automatizada.
    </p>

    <span class="h-16 gap-4 flex">
      <Input placeholder="Identificador" />
      <ProceedButton
        onclick={() => goto("/migration/89c4ab25-f743-4803-bdae-f7b2511adf2a")}
      />
    </span>
  </div>
</section>
