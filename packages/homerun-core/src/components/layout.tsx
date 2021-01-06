import React from "react";
function Footer({ config }) {
    return (
        <footer className="bg-accent-1 py-8 md:hidden">
            <div className="container mx-auto px-4">
                <Credits config={config} />
            </div>
        </footer>
    );
}

export function Credits({ config }): JSX.Element {
    return (
        <div className="flex flex-col">
            <a href={config.repo_url} className="anchor">
                {config.repo_name}
            </a>
            <span className="text-xs text-accent-5">Powered by Homerun</span>
        </div>
    );
}

export default function Layout({ children, config = {} }): JSX.Element {
    return (
        <div id="__homerun">
            {children}
            <Footer config={config} />
        </div>
    );
}
