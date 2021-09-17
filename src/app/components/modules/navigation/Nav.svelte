<script lang="ts">
   import { link } from "svelte-routing";
   import { Button } from "carbon-components-svelte";

   export let isAuthenticated;

   const logOutHandler = () => localStorage.removeItem("token");
</script>

<nav>
   <div class="nav">
      <div class="nav-wrap">
         <div class="nav-wrap__logo">
            <p>IMDB</p>
         </div>
         <ul class="nav-wrap__list">
            <li class="nav-wrap__item">
               <a class="nav-wrap__link" href="/" use:link>Home</a>
            </li>
            {#if isAuthenticated}
               <li class="nav-wrap__item">
                  <Button on:click={logOutHandler} class="lowercase">Logout</Button>
               </li>
            {:else}
               <li class="nav-wrap__item">
                  <a class="nav-wrap__link" href="login" use:link>Login</a>
               </li>
            {/if}
         </ul>
      </div>
   </div>
</nav>

<style>
   .nav {
      background: var(--primary-color);
      box-shadow: 5px 5px 10px #ededed;
      padding: 8px 25px;
      border-bottom: 2px solid #ededed;
   }

   .nav-wrap {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
   }

   .nav-wrap__logo p {
      color: #ffffff;
      font-weight: bold;
   }

   .nav-wrap__list {
      list-style-type: none;
      display: flex;
      align-items: center;
   }

   .nav-wrap__item {
      display: inline-block;
   }

   .nav-wrap__link {
      padding: 15px 20px;
      display: block;
      color: #ffffff;
      font-weight: 400;
      transition: 0.1s all ease-in-out;
   }

   .nav-wrap__link:hover {
      color: #f2f2f2;
   }
</style>
