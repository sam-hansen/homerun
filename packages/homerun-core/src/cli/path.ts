export function getHomerunPath(): String {
    return process.cwd();
}

export function getPublicPath(): String {
    return `${getHomerunPath()}/public`;
}

export function getConfigPath(): String {
    return `${getHomerunPath()}/homerun.config.js`;
}

export function getPackagesPath(): String {
    return `${getPublicPath()}/packages`;
}

export function getPackagePath(name: String): String {
    return `${getPackagesPath()}/${name}`;
}
