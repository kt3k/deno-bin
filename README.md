# deno-bin v1.7.3

> CLI wrapper for [Deno][]

You can use [deno][] via npm or npx.

Note: This module installs deno at `node_modules/deno-bin/bin/deno`, and you can use it via npx or npm's run-script.

# Usage 1

`npx deno-bin` works like `deno` executable. For example, you can run a deno script `https://deno.land/std/examples/welcome.ts` like the below:

```shellsession
$ npx deno-bin run https://deno.land/std/examples/welcome.ts
Welcome to Deno!
```

You can also start repl:

```shellsession
$ npx deno-bin
Deno 1.1.0
exit using ctrl+d or close()
>
```

You can also use deno tools:
```
npx deno-bin fmt             # Formats script
npx deno-bin lint --unstable # Checks lint rules
```

# Usage 2

Use in `scripts` in package.json.

First install `deno-bin`:

```sh
npm i --save-dev deno-bin
```

(Note: This installs `deno` executable at `node_modules/deno-bin/bin/deno` internally.)

Then use `deno` in your "scripts".

package.json:

```json
{
  ...
  "scripts": {
    "foo": "deno run some-script.ts"
  },
  ...
}
```

Then hit the command `npm run foo`, and it executes `deno run some-script.ts` with locally installed deno.

# License

MIT

[deno]: https://deno.land
