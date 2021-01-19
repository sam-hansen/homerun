import { getPackagePreview } from "@/getPackages";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

function appUrl(req: NextApiRequest) {
    let host =
        // prettier-ignore
        (req === null || req === void 0)
            ? void 0
            : (req.headers)
                ? req.headers.host
                : window.location.host;

    let protocol = /^localhost(:\d+)?$/.test(host) ? "http:" : "https:";

    if (
        req &&
        req.headers["x-forwarded-host"] &&
        typeof req.headers["x-forwarded-host"] === "string"
    ) {
        host = req.headers["x-forwarded-host"];
    }

    if (
        req &&
        req.headers["x-forwarded-proto"] &&
        typeof req.headers["x-forwarded-proto"] === "string"
    ) {
        protocol = req.headers["x-forwarded-proto"] + ":";
    }

    return {
        protocol: protocol,
        host: host,
        origin: `${protocol}//${host}`,
    };
}

export default (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { slug },
    } = req;
    const pkg: Package = getPackagePreview(slug);
    if (pkg === undefined) {
        res.status(404).json({});
        return;
    }
    const { origin } = appUrl(req);
    const root = `${origin}/packages/${pkg.slug}`;

    /**
     * Loading the description
     */
    let description = "";
    try {
        fs.accessSync(
            `./public/packages/${pkg.slug}/depiction.mdx`,
            fs.constants.F_OK | fs.constants.R_OK
        );
        description = fs.readFileSync(
            `./public/packages/${pkg.slug}/depiction.mdx`,
            {
                encoding: "utf-8",
            }
        );
    } catch {
        // console.error("Error while loading the description");
    }

    /**
     * Rendering JSON
     */
    res.status(200).json({
        minVersion: "0.1",
        headerImage: `${root}/${pkg.banner}`,
        class: "DepictionTabView",
        tabs: [
            {
                class: "DepictionStackView",
                tabname: "Details",
                views: [
                    {
                        class: "DepictionScreenshotsView",
                        itemCornerRadius: 8,
                        itemSize: "{173, 375}", // Update this lated
                        screenshots: [
                            ...pkg.screenshots.map((screen) => ({
                                url: `${root}/${screen}`,
                                accessibilityText: `${pkg.name} Screenshot`,
                            })),
                        ],
                    },
                    {
                        class: "DepictionMarkdownView",
                        markdown: description,
                    },
                ],
            },
        ],
    });
};
