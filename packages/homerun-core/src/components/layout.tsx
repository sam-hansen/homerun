import React from "react";
import { getConfig, getPJson } from "../files";
import { Config } from "../interfaces";

function Footer() {
    const config: Config = getConfig();
    const pJson: any = getPJson();
    return (
        <div className="border-t border-accent-3 py-8 mt-16 border-gray-500 border-opacity-10 container mx-auto">
            <span>
                <a href={config.repo_url} className="anchor">
                    {config.repo_name}
                </a>
                • Powered by Homerun {pJson?.version}
            </span>
        </div>
    );
}

export default function Layout({ children }) {
    return (
        <div id="__homerun">
            {children}
            <Footer />
        </div>
    );
}
