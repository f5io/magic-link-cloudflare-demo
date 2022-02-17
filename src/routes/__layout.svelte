<script context="module" lang="ts">
  import { me } from '$lib/auth';
  export async function load({ fetch }) {
    await me(fetch);
    return { status: 200 };
  }
</script>

<slot/>
