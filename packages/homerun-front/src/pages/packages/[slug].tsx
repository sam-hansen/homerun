import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { getAllPackagePreview, getPackagePreview } from "@/getPackages";
import { useConfig } from "@twickd/homerun/dist/hooks";
import PackageIcon from "@/components/packages/icon";
import PackageBanner from "@/components/packages/banner";
import { useCallback, useState } from "react";
import {
    DepictionBody,
    DepictionChangelog,
    DepictionInfos,
} from "@/components/depiction";

export default function Depiction({ pkg }: { pkg: Package }): JSX.Element {
    const [active, setActive] = useState(false);

    const config = useConfig();

    const toggleView = useCallback(() => {
        setActive((state) => !state);
    }, [active]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            <Head>
                <title>
                    {pkg.name} - {config.repo_name}
                </title>
            </Head>

            <div className="md:col-span-2 lg:col-span-3">
                <div className="container mx-auto max-w-6xl px-4 xl:px-0">
                    <PackageBanner pkg={pkg} position="object-top" />
                    <div className="my-8">
                        <h1 className="font-semibold text-4xl lg:text-5xl">
                            {pkg.name}
                        </h1>
                    </div>
                    {!active ? (
                        <DepictionBody pkg={pkg} />
                    ) : (
                        <DepictionChangelog pkg={pkg} />
                    )}
                </div>
            </div>

            <div className="bg-accent-1 p-4 lg:py-8">
                <div className="mx-auto max-w-sm space-y-8 sticky top-8 bottom-8">
                    <figure className="square-32 rounded-4xl shadow-xl overflow-hidden mx-auto">
                        <PackageIcon pkg={pkg} size={128} />
                    </figure>
                    <div>
                        <h3 className="font-semibold text-2xl">Description</h3>
                        <p className="text-sm text-accent-7 leading-relaxed mt-4">
                            {pkg.description}
                        </p>
                    </div>
                    <DepictionInfos pkg={pkg}>
                        <button
                            onClick={toggleView}
                            className="px-4 py-4 border border-accent-3 hover:bg-black hover:text-white font-semibold rounded-xl w-full"
                        >
                            {!active ? "Version history" : "Description"}
                        </button>
                    </DepictionInfos>
                </div>
            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const pkg: Package = getPackagePreview(params.slug);
    return {
        props: { pkg },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPackagePreview().map((pkg: Package) => ({
        params: { slug: pkg.slug },
    }));

    return { paths, fallback: false };
};
