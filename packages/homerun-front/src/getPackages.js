import { readdirSync } from "fs";

function importAllPreview(r) {
	return r.keys().map((fileName) => {
		let screenshots, debs;
		try {
			screenshots = readdirSync(`./public/packages/${fileName.split("/")[1]}/screenshots`);
			debs = readdirSync(`./public/packages/${fileName.split("/")[1]}/debs`);
		} catch (e) {
			screenshots = null;
			debs = null;
		}
		return {
			...r(fileName),
			screenshots: screenshots,
			debs: debs,
		};
	});
}

export function getAllPackagePreview() {
	return importAllPreview(require.context("../public/packages", true, /\.js/)).sort((a, b) => {
		if (a.name < b.name) return -1;
		if (a.name > b.name) return 1;
		return 0;
	});
}

export function getPackagePreview(slug) {
	return getAllPackagePreview().filter((p) => p.slug === slug)[0];
}
