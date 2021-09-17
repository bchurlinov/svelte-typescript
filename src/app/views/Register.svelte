<script lang="ts">
   import { link } from "svelte-routing";
   import { Button } from "carbon-components-svelte";
   import { TextInput } from "carbon-components-svelte";
   import { onMount } from "svelte";
   import { navigate } from "svelte-routing";
   import { isAuthenticated } from "../stores/auth";
   import { createUserMutation } from "../gql/mutations/createUser";
   import Login24 from "carbon-icons-svelte/lib/Login24";
   import API from "../api/api";

   import { regSchema } from "../utils/validationSchema.js";
   import _isEmpty from "lodash/isEmpty";

   let username;
   let password;
   let email;
   let first_name;
   let last_name;

   let isLoading: boolean = false;
   let successMessage: string = "";

   onMount(() => {
      if ($isAuthenticated) navigate("/");
   });

   const registerUser = async ({ ...userArgs }): Promise<void> => {
      try {
         isLoading = true;

         const { data } = await API.post(
            `http://localhost:3000/graphql`,
            createUserMutation(userArgs),
         );

         isLoading = false;

         username = "";
         password = "";
         email = "";
         first_name = "";
         last_name = "";

         successMessage = "User has been successfully created";

         setTimeout(() => {
            if (data && data.createUser.token) {
               localStorage.setItem("token", data.createUser.token);
               isAuthenticated.set(true);
               navigate("/");
            }
         }, 2000);
      } catch (err) {
         isLoading = false;
         console.log("err", err);
      }
   };

   let errors: any = {};

   const extractErrors = (err): string => {
      return err.inner.reduce((acc, err) => {
         const errorMessage: string =
            err.message.charAt(0).toUpperCase() + err.message.slice(1);
         return {
            ...acc,
            [err.path]: errorMessage,
         };
      }, {});
   };

   const handleSubmit = async () => {
      errors = {};
      try {
         await regSchema.validate(
            { username, password, email, first_name, last_name },
            { abortEarly: false },
         );
         registerUser({ username, password, email, first_name, last_name });
      } catch (err) {
         errors = extractErrors(err);
      }
   };
</script>

<div class="login">
   <div class="login__wrap">
      <div class="login__header">
         <h1>
            <Login24 style="margin-right: 15px; color: var(--primary-color);" />Register
         </h1>
      </div>

      <form on:submit|preventDefault={handleSubmit}>
         <div class="form-group">
            <TextInput
               bind:value={username}
               name="username"
               labelText="Username"
               light
               invalidText={errors.username}
               invalid={!_isEmpty(errors.username)}
            />
         </div>
         <div class="form-group">
            <TextInput
               bind:value={password}
               type="password"
               name="password"
               labelText="Password"
               light
               invalidText={errors.password}
               invalid={!_isEmpty(errors.password)}
            />
         </div>
         <div class="form-group">
            <TextInput
               bind:value={email}
               type="text"
               name="email"
               labelText="Email"
               light
               invalidText={errors.email}
               invalid={!_isEmpty(errors.email)}
            />
         </div>
         <div class="form-group">
            <TextInput
               bind:value={first_name}
               type="text"
               name="first_name"
               labelText="First name"
               light
               invalidText={errors.first_name}
               invalid={!_isEmpty(errors.first_name)}
            />
         </div>
         <div class="form-group">
            <TextInput
               bind:value={last_name}
               type="text"
               name="last_name"
               labelText="Last name"
               light
               invalidText={errors.last_name}
               invalid={!_isEmpty(errors.last_name)}
            />
         </div>
         {#if successMessage}
            <p>{successMessage}</p>
         {/if}
         <div class="form-group cta">
            <Button type="submit">{isLoading ? "Loading..." : "Register"}</Button>
         </div>
      </form>

      <div class="login__link">
         <p>
            Already have an account, <a href="login" use:link>Log in</a>
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
