export default function vitePluginMsw(options?: any): {
    name: string;
    configureServer(server: any): void;
    buildStart(): void;
    transformIndexHtml(html: string): {
        html: string;
        tags: {
            tag: string;
            attrs: {
                type: string;
            };
            children: string;
            injectTo: string;
        }[];
    } | undefined;
};
//# sourceMappingURL=index.d.ts.map