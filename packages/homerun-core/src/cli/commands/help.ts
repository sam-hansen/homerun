import { bold, cyan, dim, gray } from "chalk";
import { version } from "../../../package.json";

export default function handler(args: Array<string>): void {
    console.log(`
${dim("Options:")}
  • ${bold("create")} - Create a package
        ${dim("(Aliases: create-package, make, new)")}
  • ${bold("remove")} - Remove a package 
        ${dim("(Aliases: remove-package, rm)")}

  • ${bold("help")} - Display the list of commands and examples
        ${dim("(Aliases: h, ls, list)")}
  • ${bold("github")} - Open Twickd's GitHub

  • ${bold("init")} - Initialize your Homerun repository
  • ${bold("config")} - Show your Homerun repository configuration
        ${dim("(Aliases: cfg)")}
  • ${bold("publish")} - Publish your Homerun repository
    `);

    console.log(`
${dim("Examples:")}
  ${gray("->")} Create a package
    ${cyan(`$ ${bold("homerun")}`)} create ${gray("<PackageName>")}

  ${gray("->")} Remove a package
    ${cyan(`$ ${bold("homerun")}`)} remove ${gray("<PackageName>")}
    `);

    console.log(
        `${bold("Homerun")} is an open-source project by ${bold(
            "Twickd"
        )}\nVersion ${version} is under ${bold("MIT")} Licensing`
    );
}
