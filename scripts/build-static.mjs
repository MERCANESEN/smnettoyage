import { rename, access, rm } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const apiDir = path.join(root, "app", "api");
const apiHidden = path.join(root, "app", "_api_static_skip");
const nextDir = path.join(root, ".next");

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function runBuild() {
  // Stale .next/dev type validators still point at /api routes after we hide them.
  await rm(nextDir, { recursive: true, force: true });

  const hadApi = await exists(apiDir);
  if (hadApi) {
    if (await exists(apiHidden)) {
      throw new Error(`Found leftover ${apiHidden}. Rename it back to app/api first.`);
    }
    await rename(apiDir, apiHidden);
  }

  try {
    await new Promise((resolve, reject) => {
      const child = spawn(
        process.platform === "win32" ? "npx.cmd" : "npx",
        ["cross-env", "STATIC_EXPORT=true", "next", "build"],
        { cwd: root, stdio: "inherit", shell: process.platform === "win32" },
      );
      child.on("exit", (code) =>
        code === 0 ? resolve() : reject(new Error(`Build failed with code ${code}`)),
      );
      child.on("error", reject);
    });
  } finally {
    if (hadApi && (await exists(apiHidden))) {
      await rename(apiHidden, apiDir);
    }
  }
}

await runBuild();
