import { Config } from "../../interfaces";

import { bold, cyan, dim, green, underline } from "chalk";
import { getConfig, getPJson } from "../../files";
import { getConfigPath, getHomerunPath } from "../../paths";
import fs from "fs";
import { error } from "../output";

export default function handler(args: Array<string>): void {
    try {
        fs.accessSync(getConfigPath(), fs.constants.R_OK && fs.constants.W_OK);
    } catch (e) {
        error(
            `No configuration file detected.\nUse the command \`${bold(
                cyan("homerun")
            )} init\` to create a configuration file`
        );
        process.exit(1);
    }
    const config: Config = getConfig();
    const pJson: any = getPJson();
    console.log(`Running Homerun ${bold(pJson?.version)}`);

    console.log(dim(`\n${config.repo_name} Configuration`));

    for (const key in config) {
        if (Object.prototype.hasOwnProperty.call(config, key)) {
            console.log(`   ${key}: ${green(config[key])}`);
        }
    }

    console.log(`\nLoaded configuration: ${underline(getConfigPath())}`);
    process.exit(0);
}
