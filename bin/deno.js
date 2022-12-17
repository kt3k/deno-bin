#!/usr/bin/env node
(async function () {
  const fs = require("fs");
  const chile_process = require("child_process");
  const path = require("path");

  const executableFilename = process.platform === "win32" ? "deno.exe" : "deno";

  let executablePath = path.join(__dirname, executableFilename);

  if (!fs.existsSync(executablePath)) await require("../install.js");

  const p = chile_process.spawnSync(executablePath, process.argv.slice(2), {
    cwd: process.cwd(),
    stdio: "inherit",
    shell: false
  });

  process.exitCode = p.status;
  
  if (p.error)
    throw new Error(p.error);
})();
