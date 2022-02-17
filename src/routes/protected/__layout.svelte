<script context="module" lang="ts">
  import { get } from 'svelte/store';
  import { session } from '$lib/auth';

  export async function load() {
    const { user } = get(session); 
    if (!user) {
      return {
        status: 302,
        redirect: '/',
      }
    }
    return { status: 200 };
  }
</script>

<slot/>
