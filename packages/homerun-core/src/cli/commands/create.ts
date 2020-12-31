import { bold, dim, italic, underline } from "chalk";
import { error, success } from "../output";
const fs = require("fs");
import { getPackagePath } from "../path";

function validateArguments(args: Array<String>): String {
    if (!args[0]) {
        error("No package name provided");
        process.exit(1);
    }

    const name = args[0];
    if (!name.match(/^[a-z0-9]*$/i)) {
        error(
            `${underline(name)} contain invalid characters ${dim(
                italic(
                    "Only letter from a to Z and numbers from 0 to 9 are allowed"
                )
            )}`
        );
        process.exit(1);
    }

    return name;
}

export default function handler(args: Array<String> = []): void {
    const validated = validateArguments(args);

    fs.access(`${getPackagePath(validated)}`, fs.constants.R_OK, (err) => {
        if (err) {
            fs.mkdir(
                `${getPackagePath(validated)}`,
                { recursive: true },
                (err) => {
                    if (err) {
                        error(
                            `Could not create folder at path ${getPackagePath(
                                validated
                            )}`,
                            true
                        );
                    }
                    success(`Package ${bold(validated)} created successfully`);
                    console.log(
                        dim(
                            `   Path: ${underline(
                                `public/packages/${validated}`
                            )}`
                        )
                    );
                    process.exit(1);
                }
            );
        } else
            error(
                `The package named ${bold(
                    validated
                )} already exists at path ${getPackagePath(validated)}`,
                true
            );
    });
}
