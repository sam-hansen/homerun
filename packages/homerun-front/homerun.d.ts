declare interface Version {
    number: string;
    file?: string;
}
declare interface Package {
    name: string;
    slug: string;
    bundle_id: string;
    featured: boolean;
    section: string;
    banner: string | null;
    description: string;
    icon: string | null;
    screenshots: Array<?string>;
    debs: Array<?string>;
    changelogs?: Array<?Version>;
}

/// <reference types="@twickd/homerun" />
/// <reference types="@twickd/homerun/types" />
