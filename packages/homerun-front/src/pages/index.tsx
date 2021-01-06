import { GetStaticProps } from "next";
import { repo_name, repo_description } from "~/homerun.config";
import PackagePreview from "../components/packages/preview";
import { getAllPackagePreview } from "@/getPackages";

interface Props {
    packages: Array<Package>;
    sections: Array<String>;
}

export default function Index({ packages, sections }: Props): JSX.Element {
    const featured = packages.filter((p) => p.featured);
    return (
        <div className="container mx-auto max-w-6xl px-4 xl:px-0">
            <div className="bg-accent-1 border border-accent-3 flex flex-col items-center justify-center h-96 rounded-b-3xl mb-16">
                <h1 className="text-5xl font-semibold mb-2">{repo_name}</h1>
                <p className="text-accent-5">{repo_description}</p>
            </div>

            {featured && (
                <div className="mb-16">
                    <h2 className="text-2xl font-semibold mb-4">Featured</h2>
                    <div className="flex space-x-8 overflow-x-auto py-4">
                        {featured.map((pkg, kk) => (
                            <div className="w-96 flex-shrink-0">
                                <PackagePreview pkg={pkg} key={kk} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex flex-col space-y-16">
                {sections.map((section, k) => {
                    const pkgs = packages.filter((p) => p.section === section);
                    return (
                        <div key={k}>
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-semibold">{section}</h3>
                                <p className="text-sm text-accent-5">
                                    {pkgs.length} {pkgs.length > 1 ? "Packages" : "Package"}
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
            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    const packages = getAllPackagePreview();
    const sections = [...new Set(packages.map(({ section }) => section))].sort((a: any, b: any) => a.localeCompare(b));
    return {
        props: {
            packages: packages,
            sections: sections,
        },
    };
};
