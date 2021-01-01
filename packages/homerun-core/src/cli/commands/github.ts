const open = require("open");
import { twickd } from "../../../package.json";
import { bold, underline } from "chalk";

export default function handler(args: Array<string> = []): void {
    console.log(
        `Openning ${bold(underline(twickd))} in your default Web Browser`
    );
    open(twickd);
    process.exit(1);
}
