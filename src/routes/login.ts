import type { RequestEvent, EndpointOutput } from '@sveltejs/kit';
import { magic } from '$lib/magic';
import { createCookie } from '$lib/cookies';

export async function post(event: RequestEvent): Promise<EndpointOutput> {
  const request = event.request;
  try {
    const did = magic.utils.parseAuthorizationHeader(request.headers.get('authorization'));
    magic.token.validate(did);
    const metadata = await magic.users.getMetadataByToken(did);

    const cookie = await createCookie(metadata);

    return {
      status: 200,
      headers: {
        'set-cookie': cookie,
      },
      body: { user: metadata as any },
    };
  } catch(e) {
    return {
      status: 500,
      body: e.message,
    };
  }
}
