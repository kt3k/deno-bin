# deno-bin ![npm](https://img.shields.io/npm/v/deno-bin?color=green)

> Use [Deno][] via npm

You can use [deno][] via npm or npx.

Note: This module installs deno at `node_modules/deno-bin/bin/deno`, and you can use it via npx or npm's run-script.

# Usage via npx

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

# Usage via run-scripts

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

# Ideas of usages

## Use `deno lint` in your node.js project

You can format your scripts with `deno lint` which is faster than prettier. (`deno lint` uses [dprint][] internally, which is mostly compatible with prettier and is implemented in Rust.)

```json
{
  "scripts": {
    "fmt": "deno fmt src"
  }
}
```

## Run some utility scripts

When you need some utility scripts in your repository, you can use deno for it. Because Deno can run typescript out of the box, you can skip any settings about typescript.

```json
{
  "scripts": {
    "task": "deno run ./tools/some-task.ts"
  }
}
```

# About the version of deno

`deno-bin` downloads the same version of `deno` executable as its own version number. For example, if you install `deno-bin@1.8.1`, you'll get deno `v1.8.1`.

# License

MIT

# History

- 2021-04-26 Windows support [#4](https://github.com/kt3k/deno-bin/pull/4)

[deno]: https://deno.land
[dprint]: https://dprint.dev/

