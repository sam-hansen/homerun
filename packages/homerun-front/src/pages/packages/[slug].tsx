import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPackagePreview, getPackagePreview } from "@/getPackages";
import dynamic from "next/dynamic";

function DepictionImages({ pkg }: { pkg: Package }): JSX.Element {
    return (
        <div className="bg-accent-1 rounded-5xl p-4 -mx-4 sm:mx-0">
            <div className="flex space-x-4 overflow-x-auto rounded-3xl">
                {pkg.screenshots.map((file, key) => (
                    <a href={`/packages/${pkg.slug}/screenshots/${file}`} key={key}>
                        <img src={`/packages/${pkg.slug}/screenshots/${file}`} height={768} width={256} className="max-w-none bg-accent-2 border-none outline-none rounded-3xl" />
                    </a>
                ))}
            </div>
        </div>
    );
}

export default function Depiction({ pkg }: { pkg: Package }): JSX.Element {
    const Mdx = dynamic(() => import(`~/public/packages/${pkg.slug}/depiction.mdx`));
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            <div className="md:col-span-2 lg:col-span-3">
                <div className="container mx-auto max-w-6xl px-4 xl:px-0">
                    {pkg.banner && <div className="bg-primary flex flex-col items-center justify-center text-white h-96 rounded-b-3xl"></div>}
                    <div className="my-8">
                        <h1 className="font-semibold text-4xl lg:text-5xl">{pkg.name}</h1>
                    </div>
                    {pkg.screenshots && pkg.screenshots.length > 0 && <DepictionImages pkg={pkg} />}
                    <div className="prose lg:prose-lg my-8">
                        <Mdx />
                    </div>
                </div>
            </div>

            <div className="bg-accent-1 p-4 lg:py-8">
                <div className="mx-auto max-w-sm">
                    <figure className="h-32 w-32 mx-auto mb-8 rounded-2xl bg-accent-3 shadow-xl overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1559762717-99c81ac85459?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1834&q=80"
                            alt={`${pkg.name} Icon`}
                            className="object-cover w-full h-full"
                        />
                    </figure>
                    <h3 className="font-semibold text-2xl">Informations</h3>
                    <div className="flex flex-col divide-y divide-accent-3 max-w-sm">
                        <div className="flex justify-between py-4">
                            <p>Name</p>
                            <span className="font-semibold">{pkg.name}</span>
                        </div>
                        <div className="flex justify-between py-4">
                            <p>Bundle ID</p>
                            <span className="font-semibold">{pkg.bundle_id}</span>
                        </div>
                        <div className="flex justify-between py-4">
                            <p>Section</p>
                            <span className="font-semibold">{pkg.section}</span>
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
