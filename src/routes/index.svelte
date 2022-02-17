<script lang="ts">
  import { goto } from '$app/navigation';
  import { login } from '$lib/auth';
  let email = '';

  async function handleLogin() {
    await login(email);
    goto('/protected');
  }
</script>

<h1>Login</h1>
<form on:submit|preventDefault={handleLogin}>
  <label for="email">Email</label>
  <input id="email" bind:value={email}/>
  <button type="submit">Login</button>
</form>

<style>
  label {
    display: block;
  }
</style>
