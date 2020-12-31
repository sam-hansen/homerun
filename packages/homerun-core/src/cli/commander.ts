interface Command {
    name: String;
    aliases: Array<String>;
}

const commands: Array<Command> = [
    { name: "help", aliases: ["h", "ls", "list"] },
    { name: "github", aliases: [] },
    { name: "create", aliases: ["create-package", "make", "new"] },
    { name: "remove", aliases: ["remove-package", "rm"] },
    { name: "init", aliases: [] },
];

/**
 * Get an executable name
 *
 * @param command Input command
 */
function getExecutableName(command: String): String {
    const filtered = commands.filter(
        (cmd) => cmd.name === command || cmd.aliases.includes(command)
    )[0];

    if (filtered === undefined) {
        console.error(`Could not find any command named ${command}`);
        return getExecutableName("help");
    }
    return filtered.name;
}

/**
 * Run a command
 *
 * @param command Command to run
 * @param args Arguments
 */
export function runCommand(
    command: String = "help",
    args: Array<String> = []
): Boolean {
    const executable = getExecutableName(command);
    try {
        const handler: Function = require(`./commands/${executable}`).default;
        handler(args);
    } catch (e) {
        console.error(e);

        if (e.code === "MODULE_NOT_FOUND") {
            console.error(`Could not resolve module ${executable}`);
            return false;
        }
        return false;
    }

    return true;
}
