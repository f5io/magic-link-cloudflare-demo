import type {LoadInput} from '@sveltejs/kit';
import { Magic } from 'magic-sdk';
import { writable } from 'svelte/store';

const MAGIC_PUBLIC_KEY: string = import.meta.env.VITE_MAGIC_PUBLIC_KEY as string;

let magic: Magic;

export const session = writable({ user: null });

function createMagic(): Magic {
  magic ??= new Magic(MAGIC_PUBLIC_KEY);
  return magic;
}

export async function me(fetch: LoadInput['fetch']): Promise<void> {
  const response = await fetch('/me');
  const data = await response.json();
  session.set({ user: data.user });
}

export async function login(email: string): Promise<void> {
  const magic = createMagic();

  const did = await magic.auth.loginWithMagicLink({ email });
  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'authorization': `Bearer ${did}` },
  });

  if (response.ok) {
    const data = await response.json();
    session.set({ user: data.user });
  }
}

export async function logout(): Promise<void> {
  await fetch('/logout');
  session.set({ user: null });
}
