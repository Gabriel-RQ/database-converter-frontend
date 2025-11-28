<script lang="ts">
  import { LoaderCircleIcon, XIcon } from "@lucide/svelte";
  import { Dialog, Separator } from "bits-ui";
  import type { Snippet } from "svelte";
  import { Pagination, TextButton } from "..";
  import { getDdlScripts } from "$lib/api";

  type DDLDialogProps = {
    id: string;
    trigger: Snippet<[{ props: Record<string, unknown> }]>;
  };

  let currentPage = $state(1);

  let { id, trigger }: DDLDialogProps = $props();
</script>

<Dialog.Root>
  <Dialog.Trigger>
    {#snippet child({ props })}
      {@render trigger({ props })}
    {/snippet}
  </Dialog.Trigger>

  <Dialog.Portal>
    <Dialog.Overlay class="fixed inset-0 z-50 bg-black/80" />

    <Dialog.Content
      class="card fixed left-1/2 top-1/2 -translate-1/2 z-50 h-fit w-2/5 min-w-[490px] max-h-[70dvh] overflow-hidden grid grid-rows-[auto_1fr_auto]"
    >
      {#await getDdlScripts(fetch, id, currentPage - 1)}
        <div class="flex items-center justify-center flex-col">
          <LoaderCircleIcon class="animate-spin size-24" />
          <p>Buscando arquivos DDL...</p>
        </div>
      {:then scripts}
        <Dialog.Title class="flex items-center justify-center title"
          >Visualizar e editar DDL</Dialog.Title
        >
        <Separator.Root class="h-px bg-primary -mx-6 mt-3 mb-6 block" />

        <div class="size-full overflow-y-auto outline-none space-y-2 pr-1">
          {#each scripts.files as file (file.filename)}
            <div class="base-border rounded-lg p-2 min-h-max">
              <p class="font-semibold text-lg text-center">{file.filename}</p>
              <textarea
                class="w-full resize-none field-sizing-content outline-none"
                spellcheck="false">{file.content}</textarea
              >
            </div>
          {/each}
        </div>

        <Pagination
          count={scripts.total}
          perPage={5}
          bind:page={currentPage}
          class="mt-3"
        />

        <div class="flex items-center justify-end mt-4">
          <Dialog.Close>
            {#snippet child({ props })}
              <TextButton {...props}>Confirmar</TextButton>
            {/snippet}
          </Dialog.Close>
        </div>

        <Dialog.Close class="absolute right-5 top-5">
          <XIcon class="size-8" />
          <span class="sr-only">Fechar</span>
        </Dialog.Close>
      {/await}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
