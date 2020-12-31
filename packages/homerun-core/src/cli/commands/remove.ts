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

    fs.access(
        getPackagePath(validated),
        fs.constants.R_OK && fs.constants.W_OK,
        (err) => {
            if (err) {
                error(
                    `Can not resolve package ${bold(
                        validated
                    )} at path ${underline(getPackagePath(validated))}`,
                    true
                );
            } else {
                fs.rmdir(
                    getPackagePath(validated),
                    { recursive: true },
                    (err) => {
                        if (err) {
                            error(
                                `Package ${bold} could not be removed, make sure the permissions are set correctly and retry`,
                                true
                            );
                        } else {
                            success(
                                `Package ${bold(
                                    validated
                                )} successfully removed`,
                                true
                            );
                        }
                    }
                );
            }
        }
    );
}
