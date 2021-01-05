const path = require("path");
const withMDX = require("@next/mdx")({
    extensions: /\.mdx?$/,
});

module.exports = withMDX({
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    webpack: (config, options) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "~": path.resolve(process.cwd()),
            homerun: "@twickd/homerun/dist",
        };
        return config;
    },
});
