import Together from "together-ai";
import type { AppContext } from "@tsdiapi/server";
import { CompletionCreateParamsBase } from "together-ai/resources/completions";
import { PluginOptions } from "./index.js";
export type TogetherResponse<T> = {
    result: T;
    usage: Together.Chat.Completions.ChatCompletionUsage;
    message: Together.Chat.Completions.ChatCompletionMessage;
};
export declare class TogetherProvider {
    together: Together;
    private config;
    logger: AppContext["fastify"]["log"];
    constructor();
    init(config: PluginOptions, logger: AppContext["fastify"]["log"]): void;
    /**
     * Sends a text prompt to Together AI
     * @param prompt Text prompt
     * @param model Optional: custom model
     * @param options Optional generation parameters
     */
    chat(prompt: string, options?: Partial<CompletionCreateParamsBase>, model?: string): Promise<TogetherResponse<string> | null>;
    /**
     * Analyzes an image with Together AI
     * @param url URL of the image
     * @param comment Optional: task description
     * @param options Optional generation parameters
     */
    analyzeImage(url: string, comment?: string, options?: Partial<CompletionCreateParamsBase>, model?: string): Promise<TogetherResponse<string> | null>;
}
//# sourceMappingURL=provider.d.ts.map