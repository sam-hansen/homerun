import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPackagePreview, getPackagePreview } from "../../getPackages";
import dynamic from "next/dynamic";

interface Props {
	pkg: Package;
}

function DepictionImages({ pkg }: Props): JSX.Element {
	return (
		<div className="flex space-x-4 overflow-x-auto">
			{pkg.screenshots.map((file, key) => (
				<a href={`/packages/${pkg.slug}/screenshots/${file}`} key={key}>
					<img src={`/packages/${pkg.slug}/screenshots/${file}`} height={768} width={256} className="bg-accent-2 border-none outline-none rounded-3xl" />
				</a>
			))}
		</div>
	);
}

export default function Depiction({ pkg }: Props): JSX.Element {
	const Mdx = dynamic(() => import(`../../../public/packages/${pkg.slug}/depiction.mdx`));
	return (
		<div className="container mx-auto max-w-6xl px-4 xl:px-0">
			{pkg.banner && <div className="bg-primary flex flex-col items-center justify-center text-white h-96 rounded-b-3xl"></div>}
			<div className="border-b border-accent-3 my-8 pb-8">
				<h1 className="font-semibold text-4xl lg:text-5xl">{pkg.name}</h1>
			</div>
			{pkg.screenshots && pkg.screenshots.length > 0 && <DepictionImages pkg={pkg} />}
			<div className="prose lg:prose-lg my-8">
				<Mdx />
			</div>

			<div className="border-t border-accent-3 pt-4">
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
