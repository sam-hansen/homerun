import Image from "next/image";

interface IconProps {
    pkg: Package;
    layout?: "fill" | "fixed" | "intrinsic" | "responsive" | undefined;
    size?: number | string;
    quality?: number;
}

export default function PackageIcon({ pkg, layout = "fixed", size = 96, quality = 100 }: IconProps): JSX.Element {
    if (pkg.icon) {
        if (layout !== "fill") {
            return <Image src={`/packages/${pkg.slug}/${pkg.icon}`} width={size} height={size} layout={layout} quality={quality} />;
        }
        return <Image src={`/packages/${pkg.slug}/${pkg.icon}`} layout="fill" quality={quality} />;
    }
    return (
        <img
            src={`https://images.unsplash.com/photo-1559762717-99c81ac85459?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1834&q=${quality}`}
            alt={`${pkg.name} Icon`}
            className="object-cover w-full h-full"
        />
    );
}
