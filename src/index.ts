import "reflect-metadata";
import type { AppContext, AppPlugin } from "@tsdiapi/server";
import { TogetherProvider } from "./provider";
export type { TogetherResponse } from "./provider";

let togetherProvider: TogetherProvider | null = null;

export type PluginOptions = {
    apiKey: string;
    model: string;
    maxTokens?: number;
    temperature?: number;
    topP?: number;
    topK?: number;
    repetitionPenalty?: number;
};

const defaultConfig: PluginOptions = {
    apiKey: "",
    model: "meta-llama/Llama-Vision-Free"
};

class App implements AppPlugin {
    name = "tsdiapi-together";
    config: PluginOptions;
    context: AppContext;
    provider: TogetherProvider;

    constructor(config?: PluginOptions) {
        this.config = { ...defaultConfig, ...config };
        this.provider = new TogetherProvider();
    }

    async onInit(ctx: AppContext) {
        if (togetherProvider) {
            ctx.logger.warn("🚨 Together AI Plugin is already initialized. Skipping re-initialization.");
            return;
        }

        this.context = ctx;
        const appConfig = ctx.config.appConfig || {};

        this.config.apiKey = this.config.apiKey || appConfig["TOGETHER_API_KEY"];
        this.config.model = this.config.model || appConfig["TOGETHER_DEFAULT_MODEL"];
        this.config.maxTokens = this.config.maxTokens || appConfig["TOGETHER_MAX_TOKENS"];
        this.config.temperature = this.config.temperature || appConfig["TOGETHER_TEMPERATURE"];
        this.config.topP = this.config.topP || appConfig["TOGETHER_TOP_P"];
        this.config.topK = this.config.topK || appConfig["TOGETHER_TOP_K"];
        this.config.repetitionPenalty = this.config.repetitionPenalty || appConfig["TOGETHER_REPETITION_PENALTY"];

        if (!this.config.apiKey) {
            throw new Error("❌ Together AI Plugin is missing an API key.");
        }

        this.provider.init(this.config, ctx.logger);
        togetherProvider = this.provider;

        ctx.logger.info("✅ Together AI Plugin initialized.");
    }
}

export function getTogetherProvider(): TogetherProvider {
    if (!togetherProvider) {
        throw new Error("❌ Together AI Plugin is not initialized. Use createPlugin() first.");
    }
    return togetherProvider;
}

export { TogetherProvider };

export default function createPlugin(config?: PluginOptions) {
    return new App(config);
}
