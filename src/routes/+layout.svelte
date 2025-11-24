<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import { Footer, Header } from "$lib/components";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Database Converter</title>
</svelte:head>

<Header />

<main>
  {@render children()}
</main>

<Footer />
