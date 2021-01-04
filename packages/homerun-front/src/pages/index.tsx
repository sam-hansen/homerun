import { GetStaticProps } from "next";
import { repo_name, repo_url } from "../../homerun.config";
import PackagePreview from "../components/packages/preview";
import { getAllPackagePreview } from "../getPackages";

interface Props {
	packages: Array<Package>;
	sections: Array<String>;
}

export default function Index({ packages, sections }: Props): JSX.Element {
	return (
		<div className="container mx-auto max-w-6xl px-4 xl:px-0">
			<div className="bg-black flex flex-col items-center justify-center text-white h-96 rounded-b-3xl mb-16">
				<h1 className="text-5xl font-semibold">{repo_name}</h1>
				<p>{repo_url}</p>
			</div>

			<div className="flex flex-col space-y-16">
				{sections.map((section, k) => {
					const pkgs = packages.filter((p) => p.section === section);
					return (
						<div key={k}>
							<p className="text-xl font-semibold border-b border-accent-3 mb-8">{section}</p>
							<div className="grid lg:grid-cols-2 gap-8">
								{pkgs.map((p, key) => (
									<PackagePreview pkg={p} key={key} />
								))}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const packages = getAllPackagePreview();
	const sections = [...new Set(packages.map(({ section }) => section))].sort((a, b) => a.localeCompare(b));
	return {
		props: {
			packages: packages,
			sections: sections,
		},
	};
};
