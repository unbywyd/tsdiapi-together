import { TogetherProvider } from "./provider.js";
let togetherProvider = null;
const defaultConfig = {
    apiKey: "",
    model: "meta-llama/Llama-Vision-Free"
};
class App {
    name = "tsdiapi-together";
    config;
    context;
    provider;
    constructor(config) {
        this.config = { ...defaultConfig, ...config };
        this.provider = new TogetherProvider();
    }
    async onInit(ctx) {
        if (togetherProvider) {
            ctx.fastify.log.warn("🚨 Together AI Plugin is already initialized. Skipping re-initialization.");
            return;
        }
        this.context = ctx;
        const config = ctx.projectConfig;
        this.config.apiKey = config.get("TOGETHER_API_KEY", this.config.apiKey);
        this.config.model = config.get("TOGETHER_DEFAULT_MODEL", this.config.model);
        this.config.maxTokens = config.get("TOGETHER_MAX_TOKENS", this.config.maxTokens);
        this.config.temperature = config.get("TOGETHER_TEMPERATURE", this.config.temperature);
        this.config.topP = config.get("TOGETHER_TOP_P", this.config.topP);
        this.config.topK = config.get("TOGETHER_TOP_K", this.config.topK);
        this.config.repetitionPenalty = config.get("TOGETHER_REPETITION_PENALTY", this.config.repetitionPenalty);
        if (!this.config.apiKey) {
            throw new Error("❌ Together AI Plugin is missing an API key.");
        }
        this.provider.init(this.config, ctx.fastify.log);
        togetherProvider = this.provider;
        ctx.fastify.decorate("together", this.provider);
    }
}
export function useTogetherProvider() {
    if (!togetherProvider) {
        throw new Error("❌ Together AI Plugin is not initialized. Use createPlugin() first.");
    }
    return togetherProvider;
}
export { TogetherProvider };
export default function createPlugin(config) {
    return new App(config);
}
//# sourceMappingURL=index.js.map