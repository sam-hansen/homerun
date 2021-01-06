import Image from "next/image";

interface BannerProps {
    pkg: Package;
    position?: "object-top" | "object-center" | "object-bottom";
    quality?: number;
}

export default function PackageBanner({ pkg, position = "object-center", quality = 100 }: BannerProps): JSX.Element {
    return (
        <>
            {pkg.banner && (
                <div className="-mx-4 md:mx-0 flex items-center relative overflow-hidden justify-center bg-primary h-16 md:rounded-b-5xl md:aspect-h-6 md:aspect-w-16">
                    <Image src={`/packages/${pkg.slug}/${pkg.banner}`} layout="fill" quality={quality} className={`object-cover ${position}`} />
                </div>
            )}
        </>
    );
}
