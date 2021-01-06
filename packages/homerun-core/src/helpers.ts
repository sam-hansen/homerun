export function slugify(string: String, separator: string = "-") {
    return string
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, separator);
}

export function modulify(obj: Object) {
    return `module.exports = ${obj}`;
}

export function trimString(string: string, length: number = 140): string {
    return string.length > length
        ? string.substring(0, length - 3) + "..."
        : string;
}
