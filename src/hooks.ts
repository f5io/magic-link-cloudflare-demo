import type { Handle } from '@sveltejs/kit';
import { extractCookie, verifyJWT } from '$lib/cookies';

export const handle: Handle = async ({ event, resolve }) => {
  const cookie = extractCookie(event.request.headers.get('cookie'));

  if (cookie != null) {
    const user = await verifyJWT(cookie).catch(() => null);
    if (user != null) {
      event.locals.user = user;
    } else {
      event.locals.user = null;
    }
  }

  return resolve(event);
};
