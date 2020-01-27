# deno-bin

> CLI wrapper for [Deno][], a secure runtime for JavaScript and TypeScript

You can use [deno][] in run-scripts of package.json, or as an npx command like `npx deno-bin` without installing deno globally.

# Usage 1

Use with `npx`:

To execute an url:

```
npx deno-bin https://deno.land/std/examples/welcome.ts
```

To show the help message:

```
npx deno-bin --help
```

# Usage 2

Use in npm's `run-script`.

First install `deno-bin` in your package.json:

```
npm i --save-dev deno-bin

# or

yarn add --dev deno-bin
```

Then use `deno` command in your "scripts" section of `package.json`.

package.json:

```json
{
  ...
  "scripts": {
    "foo": "deno some-script.ts"
  },
  ...
}
```

Then hit the command `npm run foo` which invokes deno with `some-script.ts`. This means you can use deno in the development of your node.js module without installing deno globally.

# License

MIT

[deno]: https://deno.land
