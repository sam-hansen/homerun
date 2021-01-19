import "../styles/globals.css";
import "../styles/themes/default.css";
import { Layout } from "homerun/components";
import config from "~/homerun.config.js";
import { ConfigProvider } from "@twickd/homerun/dist/hooks";

function HomerunApp({ Component, pageProps }) {
    return (
        <ConfigProvider config={config}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ConfigProvider>
    );
}
export default HomerunApp;
