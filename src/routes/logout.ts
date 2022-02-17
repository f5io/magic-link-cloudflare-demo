import type { RequestEvent, EndpointOutput } from '@sveltejs/kit';
import { magic } from '$lib/magic';
import { revokeCookie } from '$lib/cookies';


export async function get(event: RequestEvent): Promise<EndpointOutput> {
  try {
    if (!event.locals.user) {
      return {
        status: 401,
        body: 'unauthorized',
      };
    }

    const cookie = revokeCookie();
    try {
      await magic.users.logoutByIssuer(event.locals.user.issuer);
    } catch(e) {}

    return {
      status: 200,
      headers: {
        'cache-control': 'no-store',
        'set-cookie': cookie
      },
      body: {},
    };
  } catch(e) {
    return {
      status: 401,
      body: 'unauthorized',
    };
  }
}
