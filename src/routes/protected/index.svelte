<script lang="ts">
  import { goto } from '$app/navigation';
  import { logout, session } from '$lib/auth';

  async function handleLogout() {
    await logout();
    goto('/');
  }
</script>

<h1>Protected</h1>
<pre>{JSON.stringify($session, null, 2)}</pre>
<button on:click|preventDefault={handleLogout}>Logout</button>

