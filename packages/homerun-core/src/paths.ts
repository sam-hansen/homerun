import { slugify } from "./helpers";

export function getHomerunPath(): string {
    return process.cwd();
}

export function getPublicPath(): string {
    return `${getHomerunPath()}/public`;
}

export function getConfigPath(): string {
    return `${getHomerunPath()}/homerun.config.js`;
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
