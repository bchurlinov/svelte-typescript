<script lang="ts">
   import { Route } from "svelte-routing";
   import { onMount } from "svelte";
   import { navigate } from "svelte-routing";
   import { isAuthenticated } from "src/app/stores/auth";

   import Navigation from "../../components/modules/navigation/Nav.svelte";
   import Home from "../../views/Home.svelte";
   import Login from "../../views/Login.svelte";
   import Register from "../../views/Register.svelte";

   onMount(() => {
      const token = localStorage.getItem("token");

      if (token) isAuthenticated.set(true);
      if (!$isAuthenticated) navigate("login");
   });
</script>

<div>
   <Navigation isAuthenticated={$isAuthenticated} />
   <div>
      <Route path="/" component={Home} />
      <Route path="login" component={Login} />
      <Route path="register" component={Register} />
   </div>
</div>

<style>
   :global(:root) {
      --primary-color: #f5c518;
   }
</style>
