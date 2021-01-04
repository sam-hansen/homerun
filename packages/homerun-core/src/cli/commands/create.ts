import { bold, dim, green, italic, underline } from "chalk";
import { error, success } from "../output";
const fs = require("fs");
import {
    getPackageConfigPath,
    getPackagePath,
    getPackageDebsPath,
    getPackageScreenshotsPath,
} from "../../paths";
import inquirer from "inquirer";
import { modulify, slugify } from "../../helpers";
import { inspect } from "util";
import { getConfig } from "../../files";

function validateArguments(args: Array<string>): string {
    if (!args[0]) {
        error("No package name provided");
        process.exit(1);
    }

    const name = args[0];
    if (!name.match(/^[a-z0-9 ]*$/i)) {
        error(
            `${underline(name)} contain invalid characters ${dim(
                italic(
                    "Only letter from a to Z, numbers from 0 to 9 and spaces are allowed"
                )
            )}`
        );
        process.exit(1);
    }

    return name;
}

// prettier-ignore
export default function handler(args: Array<string> = []): void {
    const validated = validateArguments(args);
    const config = getConfig();

    try {
        fs.accessSync(getPackagePath(validated), fs.constants.R_OK && fs.constants.W_OK);
        error(`The package named ${bold( validated )} already exists at path ${underline(getPackagePath(validated))}`, true );
    } catch (e) {
        // Do nothing and keep executing the code
    }

    // Creating the package directory
    try {
        fs.mkdirSync(getPackagePath(validated), { recursive: true });
    } catch (e) {
        error(`Could not create folder at path ${getPackagePath(validated)}`, true );
    }

    // Creating the package folders & files
    try {
        // Create the paths
        fs.mkdirSync(getPackageDebsPath(validated));
        fs.mkdirSync(getPackageScreenshotsPath(validated));

        // Create the files
        fs.writeFileSync(`${getPackagePath(validated)}/depiction.mdx`, "");
    } catch (e) {
        error(`Could not create the files for this ${bold( validated )}. Please remove the package and try again`, true );
    }

    // Ask for the configuration of the package
    inquirer
        .prompt([
            {
                type: "input",
                name: "bundle_id",
                message: `${validated} Bundle ID`,
                default: () =>
                    `com.${slugify(config.repo_name)}.${slugify(validated)}`,
            },
            {
                type: "input",
                name: "description",
                message: `${validated} Short description (not longer than 140 characters)`,
                default: () =>
                    `An awesome MobileSubstrate tweak hosted on Homerun`,
            },
            {
                type: "list",
                name: "section",
                message: `Select a section for ${validated}:`,
                choices: ['Tweaks', 'Themes', 'Widgets', 'Developpement', 'UI Theme', 'Status Bar']
            },
            {
                type: "confirm",
                name: "featured",
                message: "Is this package featured",
                default: false
            }
        ])
        .then((answers: Object) => {
            // Create the config.js file from the answers
            const details = modulify( inspect({ ...answers, ...{ name: validated, slug: slugify(validated), }, }) );
            fs.writeFile(getPackageConfigPath(validated), details, (err) => {
                if (err)
                    error(`Could not save ${validated} configuration file`, true );
                console.log(`${validated} configuration file saved at path ${green( getPackageConfigPath(validated) )}` );
                success(`Package ${bold(validated)} created successfully\n\t${dim(`Path: ${underline(getPackagePath(validated))}`)}`, true);
            });
        })
        .catch((e) => console.error);
}
