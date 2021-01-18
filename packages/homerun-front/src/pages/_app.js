import "../styles/globals.css";
import "../styles/themes/default.css";
import { Layout } from "homerun/components";
import config from "~/homerun.config.js";
import { ConfigProvider } from "@twickd/homerun/dist/hooks";

function HomerunApp({ Component, pageProps }) {
    return (
        <Layout config={config}>
            <ConfigProvider config={config}>
                <Component {...pageProps} />
            </ConfigProvider>
        </Layout>
    );
}
export default HomerunApp;
