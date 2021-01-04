import fs from "fs";
import tar from "tar";
import retry from "async-retry";
import got from "got";
import path from "path";
import chalk from "chalk";
import { Stream } from "stream";
import { promisify } from "util";
import spawn from "cross-spawn";
const pipeline = promisify(Stream.pipeline);

/**
 * Install Homerun dependencies
 * @param root Root directory
 * @param dependencies Dependencies list
 */
async function install(root: string, dependencies: string[] | null): Promise<void> {
	return new Promise((resolve, reject) => {
		let command: string;
		let args: string[];

		command = "npm";
		args = (["install", dependencies && "--save", dependencies && "--save-extract", "--loglevel", "error"].filter(Boolean) as string[]).concat(dependencies || []);

		const child = spawn(command, args, {
			stdio: "inherit",
			env: { ...process.env },
		});

		child.on("close", (code) => {
			if (code !== 0) {
				reject({ command: `${command} ${args.join(" ")}` });
				return;
			}
			resolve();
		});
	});
}

/**
 * Download and extract Homerun frontend
 * @param root Root directory
 */
async function download(root: string): Promise<void> {
	return pipeline(got.stream("https://codeload.github.com/twickd/homerun/tar.gz/master"), tar.extract({ cwd: root, strip: 3 }, ["homerun-master/packages/homerun-core"]));
}

export async function createApp({ appPath }: { appPath: string }): Promise<void> {
	const root: string = path.resolve(appPath);
	const appName: string = path.basename(root);

	try {
		fs.accessSync(path.dirname(root), fs.constants.W_OK);
	} catch (e) {
		console.error(`The application path is not writeable, please check folder permissions and try again`);
		process.exit(1);
	}

	console.log(`Creating Homerun app in ${chalk.green(root)}`);
	try {
		fs.mkdirSync(root);
	} catch (e) {
		console.error(`${chalk.red(chalk.bold("Error !"))} Could not create application path. Exiting`);
		process.exit(1);
	}
	process.chdir(root);

	try {
		await retry(() => download(root), { retries: 3 });
	} catch (reason) {
		throw reason;
	}

	console.log(chalk.dim("Installing dependencies... Might take few minutes"));
	await install(root, null);

	console.log(`${chalk.green(chalk.bold("Success !"))} Created ${appName} at ${appPath}`);
	console.log("Here is a list of command you might want to use:");
	console.log("\n");
	console.log(`    ${chalk.cyan(chalk.bold("npm"))} ${chalk.dim("run")} dev`);
	console.log(`    Start the development server with watcher`);
	console.log("\n");
	console.log(`    ${chalk.cyan(chalk.bold("npm"))} ${chalk.dim("run")} build`);
	console.log(`    Build the app for production`);
	console.log("\n");
	console.log(`    ${chalk.cyan(chalk.bold("npm"))} ${chalk.dim("run")} start`);
	console.log(`    Run the built app in production mode`);
}
