import { GetStaticProps } from "next";
import Head from "next/head";
import PackagePreview from "@/components/packages/preview";
import { getAllPackagePreview } from "@/getPackages";
import { useConfig } from "@twickd/homerun/dist/hooks";

function Featured({ packages }: { packages: Array<Package> }) {
    const config = useConfig();

    return (
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h2 className="text-3xl font-semibold mb-4">Featured</h2>
                <p className="text-accent-5 max-w-md mb-8">
                    A list of {packages.length} packages curated by{" "}
                    <span className="font-semibold">{config.repo_name}</span>
                </p>
                <a
                    href="#sections"
                    className="button inline-flex items-center space-x-2 bg-accent-1 hover:bg-accent-3"
                >
                    <span>View all</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M18 12H6m12 0l-4-4m4 4l-4 4"
                        />
                    </svg>
                </a>
            </div>
            <div className="flex space-x-8 overflow-x-auto py-4">
                {packages.map((pkg, key) => (
                    <div className="w-96 flex-shrink-0" key={key}>
                        <PackagePreview pkg={pkg} key={key} />
                    </div>
                ))}
            </div>
        </div>
    );
}

interface Props {
    packages: Array<Package>;
    sections: Array<String>;
}

export default function Index({ packages, sections }: Props): JSX.Element {
    const featured = packages.filter((p) => p.featured);
    const config = useConfig();

    return (
        <div>
            <Head>
                <title>{config.repo_name}</title>
            </Head>
            <div className="bg-accent-1 border-b border-accent-3 flex flex-col items-center justify-center h-96 mb-16">
                <h1 className="text-5xl text-center font-bold mb-2">
                    {config.repo_name}
                </h1>
                <p className="text-accent-5 max-w-lg text-center">
                    {config.repo_description}
                </p>
            </div>
            <div className="container mx-auto max-w-6xl px-4 xl:px-0">
                {featured && <Featured packages={featured} />}

                <section
                    id="sections"
                    className="flex flex-col space-y-16 my-16"
                >
                    {sections.map((section, k) => {
                        const pkgs = packages.filter(
                            (p) => p.section === section
                        );
                        return (
                            <div key={k} className="">
                                <div className="mb-8">
                                    <h3 className="text-3xl font-semibold">
                                        {section}
                                    </h3>
                                    <p className="text-sm text-accent-5">
                                        {pkgs.length}{" "}
                                        {pkgs.length > 1
                                            ? "Packages"
                                            : "Package"}{" "}
                                        in this section
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {pkgs.map((p, key) => (
                                        <PackagePreview pkg={p} key={key} />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </section>
            </div>
            <footer className="bg-accent-1 text-accent-5 text-sm py-8 px-4 flex justify-center">
                <p>
                    <span className="font-semibold text-accent-7">
                        {config.repo_name}
                    </span>{" "}
                    - Powered by Homerun
                </p>
            </footer>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    const packages = getAllPackagePreview();
    const sections = [
        ...new Set(packages.map(({ section }) => section)),
    ].sort((a: any, b: any) => a.localeCompare(b));
    return {
        props: {
            packages: packages,
            sections: sections,
        },
    };
};
