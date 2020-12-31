import { runCommand } from "./commander";
import { version } from "../../package.json";

try {
    // Test if cwd exist and has not been deleted
    process.cwd();
} catch (e) {
    if (e?.message?.includes("uv_cwd")) {
        console.error("The current working directory does not exists");
        process.exit(1);
    }
}

// Grab command arguments
const [, , ...args] = process.argv;

console.log(`Homerun Command-Line Tool - Version ${version}`);

try {
    runCommand(args[0], args.slice(1));
} catch (e) {
    console.error(e.message);
    process.exit(1);
}
