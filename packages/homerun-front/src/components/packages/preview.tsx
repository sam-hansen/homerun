import Link from "next/link";

interface Props {
	pkg: Package;
}

export default function PackagePreview({ pkg }: Props): JSX.Element {
	return (
		<div className="flex items-center space-x-4">
			<Link href={{ pathname: "/packages/[slug]", query: { slug: pkg.slug } }}>
				<figure className="h-16 w-16 rounded-xl bg-accent-2"></figure>
			</Link>
			<div className="flex flex-col">
				<p className="text-2xl font-semibold">{pkg.name}</p>
				<Link href={{ pathname: "/packages/[slug]", query: { slug: pkg.slug } }}>
					<a className="text-sm mb-2 anchor">{pkg.bundle_id}</a>
				</Link>
				<p>{pkg.description}</p>
			</div>
		</div>
	);
}
