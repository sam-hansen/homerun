import Link from "next/link";
import Image from "next/image";
import { trimString } from "@twickd/homerun/dist/helpers";
import PackageIcon from "./icon";

interface Props {
    pkg: Package;
}

export default function PackagePreview({ pkg }: Props): JSX.Element {
    return (
        <Link
            href={{ pathname: "/packages/[slug]", query: { slug: pkg.slug } }}
        >
            <div className="bg-accent-1 rounded-5xl overflow-hidden p-4 md:p-8 relative group cursor-pointer h-full">
                <div
                    className="absolute inset-0 transition-opacity duration-700 opacity-10 group-hover:opacity-20"
                    style={{ filter: "blur(2rem)", WebkitFilter: "blur(2rem)" }}
                >
                    <PackageIcon pkg={pkg} layout="fill" quality={20} />
                </div>
                <div className="grid grid-cols-3 grid-rows-2 md:grid-rows-1 md:grid-cols-1 gap-x-4 gap-y-2 md:gap-6 items-center relative">
                    <p className="order-2 md:order-1 col-span-2 md:col-span-1 text-xl font-semibold md:text-center">
                        {pkg.name}
                    </p>
                    <figure className="order-1 md:order-2 row-span-2 justify-self-center square-16 md:square-32 rounded-2xl md:rounded-4xl bg-accent-3 shadow-xl overflow-hidden transition-transform duration-300 group-hover:-translate-y-2 transform-gpu">
                        <PackageIcon pkg={pkg} layout="fixed" size={128} />
                    </figure>
                    <div className="flex order-3 md:justify-self-center col-span-2 md:col-span-1">
                        <p className="text-accent-7 text-sm md:text-center">
                            {trimString(pkg.description, 140)}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
