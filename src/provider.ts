import Together from "together-ai";
import type { AppContext } from "@tsdiapi/server";
import { CompletionCreateParamsBase } from "together-ai/resources/completions";
import { PluginOptions } from "./index.js";

export type TogetherResponse<T> = {
    result: T,
    usage: Together.Chat.Completions.ChatCompletionUsage,
    message: Together.Chat.Completions.ChatCompletionMessage
}

export class TogetherProvider {
    public together: Together;
    private config: PluginOptions;
    logger: AppContext["logger"];

    constructor() { }

    init(config: PluginOptions, logger: AppContext["logger"]) {
        if (!config.apiKey) {
            throw new Error("❌ Together AI API key is required.");
        }
        this.logger = logger;
        this.config = config;
        try {
            this.together = new Together({ apiKey: config.apiKey });
            logger.info("✅ Together AI Provider initialized.");
        } catch (error) {
            logger.error("❌ Together AI Provider initialization error:", error);
        }
    }

    /**
     * Sends a text prompt to Together AI
     * @param prompt Text prompt
     * @param model Optional: custom model
     * @param options Optional generation parameters
     */
    async chat(prompt: string, options: Partial<CompletionCreateParamsBase> = {}, model?: string,): Promise<TogetherResponse<string> | null> {
        if (!this.together) {
            console.error("❌ Together AI is not initialized. Please call init() first.");
            return null;
        }

        try {
            const response = await this.together.chat.completions.create({
                messages: [{ role: "user", content: prompt }],
                model: model || this.config.model!,
                max_tokens: options.max_tokens || this.config.maxTokens!,
                temperature: options.temperature || this.config.temperature!,
                top_p: options.top_p || this.config.topP!,
                top_k: options.top_k || this.config.topK!,
                repetition_penalty: options.repetition_penalty || this.config.repetitionPenalty!,
                stream: false,
            });

            const usage = response.usage as Together.Chat.Completions.ChatCompletionUsage;
            const message = response.choices[0]?.message as Together.Chat.Completions.ChatCompletionMessage;

            return {
                result: message?.content || '',
                usage,
                message: message || null
            }
        } catch (error) {
            console.error("❌ Together AI Chat Error:", error);
            return null;
        }
    }

    /**
     * Analyzes an image with Together AI
     * @param url URL of the image
     * @param comment Optional: task description
     * @param options Optional generation parameters
     */
    async analyzeImage(url: string, comment?: string, options: Partial<CompletionCreateParamsBase> = {}, model?: string): Promise<TogetherResponse<string> | null> {
        if (!this.together) {
            console.error("❌ Together AI is not initialized. Please call init() first.");
            return null;
        }

        try {
            const response = await this.together.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text:
                                    comment ||
                                    "Describe the main item in the image for sale: include its type, color, condition, and any unique features. Be clear and factual, no exaggeration.",
                            },
                            {
                                type: "image_url",
                                image_url: { url },
                            },
                        ],
                    },
                ],
                model: model || this.config.model!,
                max_tokens: options.max_tokens || this.config.maxTokens!,
                temperature: options.temperature || this.config.temperature!,
                top_p: options.top_p || this.config.topP!, // Added missing top_p option
                top_k: options.top_k || this.config.topK!,
                repetition_penalty: options.repetition_penalty || this.config.repetitionPenalty!,
                stream: false,
            });

            const usage = response.usage as Together.Chat.Completions.ChatCompletionUsage;
            const message = response.choices[0]?.message as Together.Chat.Completions.ChatCompletionMessage;
            return {
                result: message?.content || '',
                usage,
                message: message || null
            }
        } catch (error) {
            console.error("❌ Together AI Image Analysis Error:", error);
            return null;
        }
    }
}
