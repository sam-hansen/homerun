import dynamic from "next/dynamic";
import PackageScreenshots from "@/components/packages/screenshots";
import type { ReactNode } from "react";

export function DepictionBody({ pkg }: { pkg: Package }): JSX.Element {
    const Mdx = dynamic(
        () => import(`~/public/packages/${pkg.slug}/depiction.mdx`)
    );
    return (
        <div>
            <PackageScreenshots pkg={pkg} />
            <div className="prose lg:prose-lg my-8">
                <Mdx />
            </div>
        </div>
    );
}

export function DepictionChangelog({ pkg }: { pkg: Package }): JSX.Element {
    return (
        <div className="grid gap-8">
            {pkg.changelogs.map(({ number, file }, key) => {
                if (file) {
                    const ChangelogComponent = dynamic(
                        () =>
                            import(
                                `~/public/packages/${pkg.slug}/changelogs/${number}.mdx`
                            )
                    );
                    return (
                        <div className="" key={key}>
                            <div className="text-2xl font-bold">{number}</div>
                            <div className="prose lg:prose-lg">
                                <ChangelogComponent />
                            </div>
                        </div>
                    );
                }
                return <div>Loading...</div>;
            })}
        </div>
    );
}

export function DepictionInfos({
    pkg,
    children,
}: {
    pkg: Package;
    children: ReactNode;
}): JSX.Element {
    return (
        <div>
            <h3 className="font-semibold text-2xl">Informations</h3>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 max-w-sm my-4 text-sm">
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
                <div className="flex flex-col px-4 py-2 border border-accent-3 xl:col-span-2 rounded-xl group transition-colors hover:bg-foreground">
                    <p className="text-xs uppercase tracking-wide font-semibold text-accent-5 transition-colors group-hover:text-accent-3">
                        Version
                    </p>
                    <span className="text-accent-7 leading-relaxed transition-colors group-hover:text-background">
                        {"<Insert Current Version Here>"}
                    </span>
                </div>
            </div>
            {children}
        </div>
    );
}
