#!/usr/bin/env node
import path from "path";
import prompts from "prompts";
import Commander from "commander";
import { createApp } from "./create-app";
import chalk from "chalk";
import pJson from "./package.json";

let projectPath: string = "";

const program = new Commander.Command(pJson.name)
	.version(pJson.version)
	.arguments("<app-directory>")
	.usage("<app-directory>")
	.action((name) => {
		projectPath = name;
	})
	.parse(process.argv);

async function run(): Promise<void> {
	if (typeof projectPath === "string") {
		projectPath = projectPath.trim();
	}

	if (!projectPath) {
		const res = await prompts({
			type: "text",
			name: "path",
			message: "What is your project named?",
			initial: "my-homerun-app",
		});

		if (typeof res.path === "string") {
			projectPath = res.path.trim();
		}
	}

	const resolvedProjectPath = path.resolve(projectPath);
	const projectName = path.basename(resolvedProjectPath);

	try {
		await createApp({
			appPath: resolvedProjectPath,
		});
	} catch (reason) {
		throw reason;
	}
}

run()
	.then()
	.catch(async (reason) => {
		console.log("Aborting installation");
		if (reason.command) {
			console.error(`\t${chalk.cyan(reason.command)} has failed`);
		} else {
			console.error(`${chalk.red("Unknown error")}:\n${reason}`);
		}

		process.exit(1);
	});
