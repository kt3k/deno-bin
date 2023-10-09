const fs = require("fs");
const os = require("os");
const path = require("path");
const pkg = require("./package.json");
const stream = require("stream/promises");
const AdmZip = require("adm-zip");

function filename() {
  switch (process.platform) {
    case "win32": {
      return "deno-x86_64-pc-windows-msvc.zip";
    }
    case "darwin": {
      if (process.arch === "x64") {
        return "deno-x86_64-apple-darwin.zip";
      } else if (process.arch === "arm64") {
        return "deno-aarch64-apple-darwin.zip";
      }
      throw new Error(`Not supported architecture: ${process.arch}`);
    }
    case "linux": {
      return "deno-x86_64-unknown-linux-gnu.zip";
    }
    default: {
      throw new Error(`Not a supported platform: ${process.platform}`);
    }
  }
}
function executableFilename() {
  switch (process.platform) {
    case "win32": {
      return "deno.exe";
    }
    default: {
      return "deno";
    }
  }
}

async function main() {
  const dlUrl =
    `https://github.com/denoland/deno/releases/download/v${pkg.version}/${filename()}`;
  const binPath = path.join(__dirname, "bin");
  const zipPath = path.join(
    fs.mkdtempSync(path.join(os.tmpdir(), "deno-bin")),
    "deno.zip",
  );
  const denoBin = path.join(binPath, executableFilename());

  try {
    await fs.promises.access(denoBin);
  } catch {
    // 1. Downloads Deno binary zip from github release page
    // TODO: handle errors
    const response = await fetch(dlUrl);
    // 2. Saves it in temp dir
    // TODO: avoid
    await stream.pipeline(response.body, fs.createWriteStream(zipPath));
    // 3. Extracts `deno` entry to bin path.
    new AdmZip(zipPath).extractEntryTo(executableFilename(), binPath, true, true);
    // 4. Changes the file permission
    await fs.promises.chmod(denoBin, 0o755);
    // 5. Removes the zip file
    fs.unlinkSync(zipPath);
  }
  return denoBin;
}

module.exports = main();
