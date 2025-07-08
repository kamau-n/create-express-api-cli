import { execaCommandSync } from "execa";

export async function detectPackageManager() {
    try {
        execaCommandSync("pnpm --version", { stdio: "ignore" });
        return "pnpm";
    } catch {}

    try {
        execaCommandSync("yarn --version", { stdio: "ignore" });
        return "yarn";
    } catch {}

    return "npm"; // fallback
}