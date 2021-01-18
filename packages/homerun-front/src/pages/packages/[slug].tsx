import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { getAllPackagePreview, getPackagePreview } from "@/getPackages";
import dynamic from "next/dynamic";
import config from "~/homerun.config";
import PackageIcon from "@/components/packages/icon";
import PackageBanner from "@/components/packages/banner";
import PackageScreenshots from "@/components/packages/screenshots";

export default function Depiction({ pkg }: { pkg: Package }): JSX.Element {
    const Mdx = dynamic(
        () => import(`~/public/packages/${pkg.slug}/depiction.mdx`)
    );
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
                    <PackageScreenshots pkg={pkg} />
                    <div className="prose lg:prose-lg my-8">
                        <Mdx />
                    </div>
                </div>
            </div>

            <div className="bg-accent-1 p-4 lg:py-8">
                <div className="mx-auto max-w-sm space-y-8 sticky top-8 bottom-8">
                    <figure className="w-32 h-32 rounded-4xl shadow-xl overflow-hidden mx-auto">
                        <PackageIcon pkg={pkg} size={128} />
                    </figure>
                    <div>
                        <h3 className="font-semibold text-2xl">Description</h3>
                        <p className="text-sm text-accent-7 leading-relaxed mt-4">
                            {pkg.description}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-2xl">Informations</h3>
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 max-w-sm mt-4 text-sm">
                            <div className="flex flex-col px-4 py-2 border border-accent-3 xl:col-span-2 rounded-xl group transition-colors hover:bg-foreground">
                                <p className="text-xs uppercase tracking-wide font-semibold text-accent-5 transition-colors group-hover:text-accent-3">
                                    Name
                                </p>
                                <span className="text-accent-7 leading-relaxed transition-colors group-hover:text-background">
                                    {pkg.name}
                                </span>
                            </div>
                            <div className="flex flex-col px-4 py-2 border border-accent-3 rounded-xl group hover:bg-foreground transition-colors">
                                <p className="text-xs uppercase tracking-wide font-semibold text-accent-5 transition-colors group-hover:text-accent-3">
                                    Bundle ID
                                </p>
                                <span className="text-accent-7 leading-relaxed transition-colors group-hover:text-background break-all">
                                    {pkg.bundle_id}
                                </span>
                            </div>
                            <div className="flex flex-col px-4 py-2 border border-accent-3 rounded-xl group hover:bg-foreground transition-colors">
                                <p className="text-xs uppercase tracking-wide font-semibold text-accent-5 transition-colors group-hover:text-accent-3">
                                    Section
                                </p>
                                <span className="text-accent-7 leading-relaxed transition-colors group-hover:text-background">
                                    {pkg.section}
                                </span>
                            </div>
                        </div>
                    </div>
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
