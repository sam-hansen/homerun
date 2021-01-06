import { slugify } from "../../helpers";
import { prompt } from "inquirer";
import { dim, underline, green } from "chalk";
import { error, success } from "../output";
import { CONFIG_PATH } from "../../constants";
const fs = require("fs");
const util = require("util");

function createConfig(): void {
    const questions = [
        {
            type: "input",
            name: "repo_name",
            message: "Repository Name (title)",
        },
        {
            type: "input",
            name: "repo_url",
            message: "Repository URL",
            default: function (answers) {
                return `https://${slugify(answers.repo_name)}.github.io/`;
            },
        },
        {
            type: "input",
            name: "repo_description",
            message: "Repository Description",
            validate: async (input) => {
                if (input.length > 140)
                    return "Your description is longer than 140 characters";
                return true;
            },
        },
    ];

    prompt(questions)
        .then((answers: Object) => {
            const config = `module.exports = ${util.inspect(answers)}`;
            fs.writeFile(CONFIG_PATH, config, (err) => {
                if (err) error("Could not saved your configuration file", true);
                success(
                    `Configuration file created successfully at path ${green(
                        CONFIG_PATH
                    )}`,
                    true
                );
            });
        })
        .catch((e) => {
            // Do nothing because it's handled earlier
        });
}

export default function handler(args: Array<string> = []): void {
    console.log(CONFIG_PATH);

    fs.access(CONFIG_PATH, fs.constants.R_OK && fs.constants.W_OK, (err) => {
        if (err) {
            console.log(dim("No configuration file found, creating one"));
            createConfig();
        } else {
            console.log(
                dim(
                    `Configuration file found at path ${underline(CONFIG_PATH)}`
                )
            );
            process.exit(0);
        }
    });
}
