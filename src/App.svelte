<script lang="ts">
   import { Router } from "svelte-routing";
   import Layout from "./app/components/layout/Layout.svelte";
   import "carbon-components-svelte/css/white.css";

   export let url = "";
</script>

<Router {url}>
   <Layout />
</Router>
