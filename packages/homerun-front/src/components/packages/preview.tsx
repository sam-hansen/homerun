import Link from "next/link";

interface Props {
    pkg: Package;
}

export default function PackagePreview({ pkg }: Props): JSX.Element {
    return (
        <Link href={{ pathname: "/packages/[slug]", query: { slug: pkg.slug } }}>
            <div className="bg-accent-1 rounded-2xl overflow-hidden p-8 relative group cursor-pointer">
                <div className="absolute inset-0 transition-opacity duration-700 opacity-10 group-hover:opacity-20" style={{ filter: "blur(2rem)", WebkitFilter: "blur(2rem)" }}>
                    <img
                        src="https://images.unsplash.com/photo-1559762717-99c81ac85459?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1834&q=80"
                        alt={`${pkg.name} Icon`}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="flex flex-col items-center relative">
                    <p className="text-xl font-semibold mb-6">{pkg.name}</p>
                    <figure className="h-32 w-32 rounded-2xl bg-accent-3 shadow-xl overflow-hidden transition-transform duration-300 group-hover:-translate-y-2 transform-gpu">
                        <img
                            src="https://images.unsplash.com/photo-1559762717-99c81ac85459?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1834&q=80"
                            alt={`${pkg.name} Icon`}
                            className="object-cover w-full h-full"
                        />
                    </figure>
                    <div className="flex mt-8">
                        <p className="text-accent-7 text-sm">{pkg.description}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
