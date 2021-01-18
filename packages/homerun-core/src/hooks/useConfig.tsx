import React, { createContext, useContext } from "react";

export type Config = {
    readonly repo_name?: string;
    readonly repo_url?: string;
    readonly repo_description?: string;
};

const ConfigContext = createContext<Config>({});

const useConfig = () => useContext(ConfigContext);

const ConfigProvider = ({
    config,
    children,
}: {
    config: Config;
    children: any;
}) => {
    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    );
};

export { useConfig, ConfigProvider };
