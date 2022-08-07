#!/usr/bin/env node
const fs = require("fs");
const chile_process = require("child_process");
const path = require("path");

const executableFilename = process.platform==="win32"?"deno.exe":"deno";

const executablePath = path.join(__dirname, executableFilename);

if(!fs.existsSync(executablePath)) require("./install");

const p = chile_process.spawnSync(executablePath, process.argv.slice(2), {
  cwd:process.cwd(),
  stdio:"inherit",
  shell:false
});

if(p.error)
  throw new Error(p.error);