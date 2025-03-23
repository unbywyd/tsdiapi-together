import type { AppContext, AppPlugin } from "@tsdiapi/server";
import { TogetherProvider } from "./provider.js";
export type { TogetherResponse } from "./provider.js";
import { FastifyInstance } from 'fastify';

let togetherProvider: TogetherProvider | null = null;


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
            ctx.fastify.log.warn("🚨 Together AI Plugin is already initialized. Skipping re-initialization.");
            return;
        }

        this.context = ctx;
        const config = ctx.projectConfig;

        this.config.apiKey = config.get("TOGETHER_API_KEY", this.config.apiKey) as string;
        this.config.model = config.get("TOGETHER_DEFAULT_MODEL", this.config.model) as string;
        this.config.maxTokens = config.get("TOGETHER_MAX_TOKENS", this.config.maxTokens) as number;
        this.config.temperature = config.get("TOGETHER_TEMPERATURE", this.config.temperature) as number;
        this.config.topP = config.get("TOGETHER_TOP_P", this.config.topP) as number;
        this.config.topK = config.get("TOGETHER_TOP_K", this.config.topK) as number;
        this.config.repetitionPenalty = config.get("TOGETHER_REPETITION_PENALTY", this.config.repetitionPenalty) as number;

        if (!this.config.apiKey) {
            throw new Error("❌ Together AI Plugin is missing an API key.");
        }

        this.provider.init(this.config, ctx.fastify.log);
        togetherProvider = this.provider;

        ctx.fastify.decorate("together", this.provider);
    }
}

export function useTogetherProvider(): TogetherProvider {
    if (!togetherProvider) {
        throw new Error("❌ Together AI Plugin is not initialized. Use createPlugin() first.");
    }
    return togetherProvider;
}

export { TogetherProvider };

export default function createPlugin(config?: PluginOptions) {
    return new App(config);
}
