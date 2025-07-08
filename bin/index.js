#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import ora from "ora";
import chalk from "chalk";
import { execa } from "execa";

import { detectPackageManager } from "../utils/detectPackageManager.js";

const program = new Command();
const __dirname = path.dirname(fileURLToPath(
    import.meta.url));

program
    .name("create-express-api-cli")
    .description("Scaffold a full-featured Express API (TypeScript or JavaScript)")
    .argument("<project-name>", "name of your project folder")
    .option("--ts", "Use TypeScript")
    .option("--js", "Use JavaScript")
    .option("--docker", "Include Docker support (Dockerfile, docker-compose, Jenkins)")
    .parse();

const options = program.opts();
const projectName = program.args[0];
const targetDir = path.resolve(process.cwd(), projectName);

const spinner = ora();

(async() => {
        try {
            if (!options.ts && !options.js) {
                console.log(chalk.red("❌ Please specify --ts or --js"));
                process.exit(1);
            }

            const templateDir = path.resolve(
                __dirname,
                `../templates/${options.ts ? "ts" : "js"}`
            );

            spinner.start(`Creating project in ${chalk.green(projectName)}...`);
            await fs.copy(templateDir, targetDir);

            if (options.docker) {
                const dockerFiles = path.resolve(__dirname, "../templates/common/docker");
                await fs.copy(dockerFiles, targetDir);
                spinner.info("🛠  Docker support added");
            }

            spinner.succeed("✅ Project created successfully.");

            spinner.start("📦 Detecting package manager...");
            const packageManager = await detectPackageManager();
            spinner.succeed(`📦 Using ${chalk.cyan(packageManager)} to install dependencies`);

            spinner.start("Installing dependencies...");
            await execa(packageManager, ["install"], { cwd: targetDir });
            spinner.succeed("Dependencies installed.");

            console.log(`
${chalk.green("🎉 Success!")} Your Express API is ready.

👉 Get started:

  ${chalk.cyan(`cd ${projectName}`)}
  ${chalk.cyan(`${packageManager} dev`)}

Need Docker?
  ${chalk.cyan("docker-compose up --build")}

Happy coding! 🚀
    `);
  } catch (err) {
    spinner.fail("❌ Something went wrong.");
    console.error(err);
    process.exit(1);
  }
})();