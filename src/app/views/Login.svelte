<script lang="ts">
   import { link } from "svelte-routing";
   import { isAuthenticated } from "../stores/auth";
   import { Button } from "carbon-components-svelte";
   import { TextInput } from "carbon-components-svelte";
   import { onMount } from "svelte";
   import { navigate } from "svelte-routing";
   import { Sveltik } from "sveltik";
   import Login24 from "carbon-icons-svelte/lib/Login24";
   import API from "../api/api";

   let username: string;
   let password: string;
   let error: string = "";

   $: errorMessage = error;

   onMount(() => {
      if ($isAuthenticated) navigate("/");
   });

   const handleLogin = async (): Promise<void> => {
      try {
         error = "";
         const postData = await API.post("auth/login", { username, password });
         console.log({ postData });
      } catch (err) {
         error = "Invalid username and/or password. Please try again";
      }
   };
</script>

<div class="login">
   <div class="login__wrap">
      <div class="login__header">
         <h1>
            <Login24 style="margin-right: 15px; color: var(--primary-color);" />Sign In
         </h1>
      </div>
      <form on:submit|preventDefault={handleLogin}>
         <div class="form-group">
            <TextInput
               bind:value={username}
               name="username"
               labelText="Username"
               light
               invalidText="cool"
               invalid={false}
            />
         </div>
         <div class="form-group">
            <TextInput
               bind:value={password}
               type="password"
               name="password"
               labelText="Password"
               light
               invalidText="cool"
               invalid={false}
            />
         </div>
         <div class="form-group cta">
            <Button type="submit">Submit</Button>
         </div>
      </form>

      <div class="login__link">
         <p>
            Don't have an account, <a href="register" use:link>Register</a>
         </p>
      </div>
   </div>
</div>

<style>
   .login {
      padding: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
   }

   .login__header {
      width: 100%;
      text-align: center;
      margin-bottom: 35px;
   }

   .login__header h1 {
      font-size: 28px;
      font-weight: 400;
   }

   .login__wrap {
      width: 650px;
      padding: 35px;
      border: 1px solid #ededed;
      border-radius: 5px;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
   }

   .cta {
      margin-top: 40px;
      margin-bottom: 30px;
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: center;
   }

   .login__link {
      text-align: center;
   }

   .login__link a {
      display: inline-block;
      font-weight: 700;
      text-decoration: underline;
   }
</style>
