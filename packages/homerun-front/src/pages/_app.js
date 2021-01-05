import "../styles/globals.css";
import "../styles/themes/default.css";
import { Layout } from "homerun/components";
import config from "~/homerun.config.js";

function HomerunApp({ Component, pageProps }) {
    return (
        <Layout config={config}>
            <Component {...pageProps} />
        </Layout>
    );
}
export default HomerunApp;
