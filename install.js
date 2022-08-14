const fs = require("fs");
const os = require("os");
const path = require("path");
const { https } = require("follow-redirects");
const pkg = require("./package");
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

function main() {
  return new Promise(resolve => {

    const dlUrl =
      `https://github.com/denoland/deno/releases/download/v${pkg.version}/${filename()}`;
    //console.log(dlUrl);
    const binPath = path.join(__dirname, "bin");
    const zipPath = path.join(
      fs.mkdtempSync(path.join(os.tmpdir(), "deno-bin")),
      "deno.zip",
    );
    const denoBin = path.join(binPath, executableFilename());
    
    if (fs.existsSync(denoBin)) resolve(denoBin);
    
    // 1. Download Deno binary zip from github release page
    https.get(dlUrl, (res) => {
      // 2. Saves it in temp dir
      res.pipe(fs.createWriteStream(zipPath)).on("close", () => {
        const filename = executableFilename();
        // 3. Extracts `deno` entry to bin path.
        new AdmZip(zipPath).extractEntryTo(filename, binPath, true, true);
        // 4. Changes the file permission
        if (process.platform !== "win32")
          fs.chmodSync(path.join(binPath, filename), 0o755);
        // 5. Removes the zip file
        fs.unlinkSync(zipPath);
        resolve(denoBin);
      });
    });
  });
}

module.exports = main();
