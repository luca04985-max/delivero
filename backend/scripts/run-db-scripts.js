#!/usr/bin/env node
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const args = process.argv.slice(2);
const force = args.includes('--force');
// If not forced, default to dry-run; explicit --dry-run also supported
const dryRun = args.includes('--dry-run') || !force;
const scripts = ['ensure-db-schema.js', 'seed-demo-data.js'];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptsDir = __dirname;

function runScript(script, extraArgs = []) {
  return new Promise((resolve, reject) => {
    const procArgs = [path.join(scriptsDir, script), ...extraArgs];
    const child = spawn(process.execPath, procArgs, {
      stdio: 'inherit',
      env: process.env,
    });

    child.on('close', code => {
      if (code === 0) resolve();
      else reject(new Error(`${script} exited with code ${code}`));
    });
  });
}

(async function main() {
  if (dryRun) {
    console.log('DRY-RUN: executing child scripts with --dry-run (no DB changes expected)');
  } else {
    console.log('FORCE: executing child scripts (will apply changes)');
  }

  try {
    for (const s of scripts) {
      console.log(`\n--- Running ${s} ---`);
      const extra = dryRun ? ['--dry-run'] : [];
      await runScript(s, extra);
    }
    console.log('\nAll scripts completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error running scripts:', err.message);
    process.exit(1);
  }
})();
