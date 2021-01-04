declare interface Package {
	name: string;
	slug: string;
	bundle_id: string;
	section: string;
	banner: string | null;
	description: string;
	screenshots: Array<string> | null;
	debs: Array<string> | null;
}
