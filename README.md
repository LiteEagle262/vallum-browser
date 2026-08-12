# `@liteeagle226/browser`

Use Vallum from regular HTML and JavaScript without a bundler. CSS does not
run network or cryptographic code, so a small JavaScript module is still
required; the page and styling can otherwise remain framework-free.

## Install

For a bundler-based application, install the browser package. Its
`@liteeagle226/client` dependency is installed automatically:

```sh
npm install @liteeagle226/browser
```

For a no-build page, use one of the version-pinned CDN entries below. Either
frontend needs a trusted backend broker from `@liteeagle226/admission` (or the
server entry in `@liteeagle226/nextjs`).

## Classic script

Pin an exact version in production and apply your normal Content Security
Policy and Subresource Integrity process:

```html
<pre id="result" aria-live="polite">Loading…</pre>
<script src="https://cdn.jsdelivr.net/npm/@liteeagle226/browser@0.1.1/dist/vallum.iife.js"></script>
<script>
  (async () => {
    const client = await Vallum.createVallumClient({
      endpoint: window.location.origin,
    });

    const response = await client.fetch("/api/protected");
    document.querySelector("#result").textContent =
      JSON.stringify(await response.json(), null, 2);

    window.addEventListener("pagehide", () => client.destroy(), { once: true });
  })().catch((error) => {
    document.querySelector("#result").textContent = error.message;
  });
</script>
```

The IIFE exposes `Vallum.createVallumClient`, `Vallum.VallumRenderRef`, and the
same runtime behavior as `@liteeagle226/client`.

## Browser module

```html
<script type="module">
  import { createVallumClient } from
    "https://cdn.jsdelivr.net/npm/@liteeagle226/browser@0.1.1/dist/vallum.esm.js";

  const client = await createVallumClient({ endpoint: location.origin });
  const data = await (await client.fetch("/api/protected")).json();
</script>
```

The application must already have an authenticated same-origin session, and
its backend must expose the Vallum admission route. Loading a script must never
grant admission by itself. See `@liteeagle226/admission` and the
[client SDK guide](https://github.com/LiteEagle262/vallum/blob/main/docs/client-sdk.md).
