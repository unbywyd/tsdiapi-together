import type { AppContext, AppPlugin } from "@tsdiapi/server";
import { TogetherProvider } from "./provider.js";
export type { TogetherResponse } from "./provider.js";
declare module "fastify" {
    interface FastifyInstance {
        together: TogetherProvider;
    }
}
export type PluginOptions = {
    apiKey: string;
    model: string;
    maxTokens?: number;
    temperature?: number;
    topP?: number;
    topK?: number;
    repetitionPenalty?: number;
};
declare class App implements AppPlugin {
    name: string;
    config: PluginOptions;
    context: AppContext;
    provider: TogetherProvider;
    constructor(config?: PluginOptions);
    onInit(ctx: AppContext): Promise<void>;
}
export declare function useTogetherProvider(): TogetherProvider;
export { TogetherProvider };
export default function createPlugin(config?: PluginOptions): App;
//# sourceMappingURL=index.d.ts.map