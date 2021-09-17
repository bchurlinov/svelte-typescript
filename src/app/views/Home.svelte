<script lang="ts">
   import { onMount } from "svelte";
   import { navigate } from "svelte-routing";
   import { isAuthenticated } from "../stores/auth";
   import Button, { Label } from "@smui/button";
   import API from "../api/api";

   let actors = [];
   let isLoading: boolean = false;

   onMount(() => {
      console.log($isAuthenticated);
      if (!$isAuthenticated) navigate("login");
   });

   const getAllActors = async (skip, take) => {
      try {
         isLoading = true;
         const {
            data: { getAllActors },
         } = await API.post("http://localhost:3000/graphql", {
            query: `query {
                     getAllActors(skip: ${skip}, take: ${take}){
                        id
                        name
                        last_name
                        bio
                     }
                  }`,
         });
         actors = [...getAllActors];
         isLoading = false;
      } catch (err) {
         console.log(err);
      }
   };

   const createActor = async () => {
      try {
         const response = await API.post("http://localhost:3000/graphql", {
            query: `mutation {
                     createActor(
                        newActor: {
                           name: "Al"
                           last_name: "Pacino"
                           bio: "One of the best actors ever"
                           contact_info: "jack@gmail.com"
                        }
                     ){
                        id
                        name
                        last_name
                     }
}`,
         });
         console.log(response);
      } catch (err) {
         console.log(err);
      }
   };
</script>

<div>
   <h1>Welcome from the home page</h1>
   <Button on:click={createActor} variant="raised">
      <Label>Create an actor</Label>
   </Button>
   <Button on:click={() => getAllActors(0, 25)} variant="raised">
      <Label>{isLoading ? "Is Loading" : "Get all actors"}</Label>
   </Button>
   {#if actors.length !== 0}
      <div>{JSON.stringify(actors)}</div>
   {/if}
</div>
