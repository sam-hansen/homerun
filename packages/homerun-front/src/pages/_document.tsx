import Document, { DocumentContext, Html, Head, Main, NextScript } from "next/document";
import { Layout } from "@twickd/homerun";

class HomerunDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);

		return initialProps;
	}

	render() {
		return (
			<Html>
				<Head />
				<body>
					<Layout>
						<Main />
					</Layout>
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default HomerunDocument;
