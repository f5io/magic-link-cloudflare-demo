# magic.link on cloudflare workers with sveltekit

this is an example repository of a deployment with magic.link that works on cloudflare workers.

this points to my branch of `@magic-sdk/admin` which unifies all eth crypto under the
`ethereum-cryptography` package which allows this to run in a non-node environment. i also
had to shim `node-fetch` so it doesn't interfere with native `fetch` in the cloudflare worker environment.

https://magic-link-demo.trustshare.workers.dev/

## setup instructions

1. installation:

```sh
yarn # install dependencies
yarn build:sdk # build my fork of the @magic-sdk/admin
```

2. prerequisites

you must have both a public key and a secret key from the magic dashboard.

put the public key in a `.env` file at the root like so:

```sh
VITE_MAGIC_PUBLIC_KEY="<your public key>"
```

put the secret key in a `.key.js` file at the root like so:

```ts
export const key = '<your secret key>';
```

3. deploying

put your `account_id` in the `wrangler.toml` file.

make sure you provide the secret key as a secret to your worker like so:

```sh
echo "<your secret key>" | yarn wrangler secret put MAGIC_ADMIN_KEY
```


