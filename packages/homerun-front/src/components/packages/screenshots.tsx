import Image from "next/image";

export default function PackageScreenshots({ pkg }: { pkg: Package }): JSX.Element {
    return (
        <>
            {pkg.screenshots && pkg.screenshots.length > 0 && (
                <div className="bg-accent-1 rounded-5xl p-4 -mx-4 sm:mx-0">
                    <div className="flex space-x-4 overflow-x-auto rounded-3xl">
                        {pkg.screenshots.map((file, key) => (
                            <a href={`/packages/${pkg.slug}/${file}`} key={key}>
                                <Image
                                    src={`/packages/${pkg.slug}/${file}`}
                                    quality={100}
                                    height={554}
                                    width={256}
                                    className="max-w-none bg-accent-2 border-none outline-none rounded-3xl"
                                    layout="fixed"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
