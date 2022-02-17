import { serialize, parse } from 'cookie';
import jwt from '@tsndr/cloudflare-worker-jwt';

const SESSION_NAME = 'session';
const SESSION_LENGTH = 86400000;
const SIGNING_SECRET = '0d35cd058a5e2a9132c3df14721586e929d4af5b7f5e240079c2a33ec6006e3a';

export async function verifyJWT(token: string): Promise<any> {
  const valid = await jwt.verify(token, SIGNING_SECRET);
  if (!valid) return;
  return jwt.decode(token);
}

export function extractCookie(cookies?: string): string {
  const cks = parse(cookies ?? ''); 
  return cks[SESSION_NAME];
}

export async function createCookie({ issuer, email }: { issuer: string; email: string; }): Promise<string> {
  const exp = new Date(Date.now() + SESSION_LENGTH);
  const j = await jwt.sign({
    issuer,
    email,
    exp: Math.ceil(exp.valueOf() / 1000),
  }, SIGNING_SECRET);

  return serialize(SESSION_NAME, j, {
    maxAge: Math.ceil(SESSION_LENGTH / 1000),
    expires: exp,
    httpOnly: true,
    secure: false,
    path: '/',
    sameSite: 'lax',
  });
}

export function revokeCookie(): string {
  return serialize(SESSION_NAME, '', {
    maxAge: -1,
    path: '/',
  });
}
