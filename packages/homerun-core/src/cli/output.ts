import { green, red } from "chalk";

export function success(message: String, exit: Boolean = false): void {
    console.log(green("Success !"));
    console.log(message);

    if (exit) process.exit(0);
}

export function error(message: String, exit: Boolean = false): void {
    console.error(red("Error !"));
    console.error(message);

    if (exit) process.exit(1);
}
