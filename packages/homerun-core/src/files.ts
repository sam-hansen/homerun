import { getConfigPath, getHomerunPath } from "./paths";
import { Config } from "./interfaces";

export function getConfig(): Config {
    return require(getConfigPath());
}

export function getPJson(): object {
    return require(process.cwd() + "/package.json");
}
