import { getConfigPath } from "./paths";

export interface Config {
    repo_name: string;
    repo_url: string;
}

export function getConfig(): any {
    return require(getConfigPath());
}
