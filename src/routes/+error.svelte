<script lang="ts">
  import { page } from "$app/state";
  import { ChevronLeftIcon } from "@lucide/svelte";
</script>

<div class="size-full flex justify-center items-center">
  <div class="space-y-6">
    <h1 class="text-8xl font-bold">Oops...</h1>
    <p class="text-xl">
      {page.error?.message}
    </p>
    <a
      href="/"
      class="inline-flex gap-2 items-center text-xl text-primary hover:text-secondary focus:text-secondary"
    >
      <ChevronLeftIcon class="size-4" />
      Melhor voltar
    </a>
  </div>
</div>
