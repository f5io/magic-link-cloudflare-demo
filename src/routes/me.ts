import type { RequestEvent, EndpointOutput } from '@sveltejs/kit';
import { createCookie } from '$lib/cookies';

export async function get(event: RequestEvent): Promise<EndpointOutput> {
  try {
    if (!event.locals.user) {
      return {
        status: 200,
        body: { user: null },
      };
    }

    const cookie = await createCookie(event.locals.user);

    return {
      status: 200,
      headers: {
        'cache-control': 'no-store',
        'set-cookie': cookie
      },
      body: { user: event.locals.user },
    };
  } catch(e) {
    return {
      status: 500,
      body: e.message,
    };
  }
}
