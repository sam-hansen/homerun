import { slugify } from "./helpers";
import path from "path";
import findUp from "find-up";

export function getHomerunPath(): string {
    return process.cwd() !== "/" ? process.cwd() : ".";
}

export function getPublicPath(): string {
    return findUp.sync("public", { cwd: getHomerunPath(), type: "directory" });
}

export function getConfigPath(): string {
    return findUp.sync("homerun.config.js", { cwd: getHomerunPath() });
}

export function getPackagesPath(): string {
    return `${getPublicPath()}/packages`;
}

export function getPackagePath(name: string): string {
    return `${getPackagesPath()}/${slugify(name)}`;
}

export function getPackageConfigPath(name: string): string {
    return `${getPackagePath(name)}/config.js`;
}

export function getPackageDebsPath(name: string): string {
    return `${getPackagePath(name)}/debs`;
}

export function getPackageScreenshotsPath(name: string): string {
    return `${getPackagePath(name)}/screenshots`;
}
