import Link from "next/link";
import Image from "next/image";
import { trimString } from "@twickd/homerun/dist/helpers";
import PackageIcon from "./icon";

interface Props {
    pkg: Package;
}

export default function PackagePreview({ pkg }: Props): JSX.Element {
    return (
        <Link href={{ pathname: "/packages/[slug]", query: { slug: pkg.slug } }}>
            <div className="bg-accent-1 rounded-5xl overflow-hidden p-8 relative group cursor-pointer h-full">
                <div className="absolute inset-0 transition-opacity duration-700 opacity-10 group-hover:opacity-20" style={{ filter: "blur(2rem)", WebkitFilter: "blur(2rem)" }}>
                    <PackageIcon pkg={pkg} layout="fill" quality={20} />
                </div>
                <div className="flex flex-col items-center relative">
                    <p className="text-xl font-semibold mb-6">{pkg.name}</p>
                    <figure className="h-32 w-32 rounded-4xl bg-accent-3 shadow-xl overflow-hidden transition-transform duration-300 group-hover:-translate-y-2 transform-gpu">
                        <PackageIcon pkg={pkg} layout="fixed" size={128} />
                    </figure>
                    <div className="flex mt-8">
                        <p className="text-accent-7 text-sm">{trimString(pkg.description, 140)}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
