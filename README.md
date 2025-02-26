### **together Plugin for TSDIAPI**

A TSDIAPI plugin to extend API functionality with Together AI.

---

## 📌 About

This is a **TSDIAPI** plugin designed to integrate Together AI models into your API. It provides an easy way to interact with Together AI for text generation, image analysis, and more.

🔗 **TSDIAPI CLI:** [@tsdiapi/cli](https://www.npmjs.com/package/@tsdiapi/cli)

---

## 📦 Installation

Install the plugin using the **TSDIAPI CLI**:

```bash
tsdiapi plugins add together
```

You can install this plugin using npm:

```bash
npm install --save @tsdiapi/together
```

Then, register the plugin in your **TSDIAPI** project:

```typescript
import { createApp } from "@tsdiapi/server";
import createPlugin from "@tsdiapi/together";

createApp({
  plugins: [createPlugin()],
});
```

---

## 🚀 Features

- 🛠 **Seamless integration** with **Together AI** inside **TSDIAPI**.
- 🎨 **Supports text and image-based AI models**.
- ⚙ **Highly configurable** with environment variables and plugin options.
- 📊 **Tracks token usage** for cost management.

---

## 🔧 **Configuration Options**

This plugin supports both **direct options** and **environment variables** for flexible configuration.

### **Plugin Options**

```typescript
createPlugin({
  apiKey: "your-api-key",
  model: "meta-llama/Llama-Vision-Free",
  maxTokens: 200,
  temperature: 0.3,
  topP: 0.7,
  topK: 50,
  repetitionPenalty: 1.2,
});
```

| Option              | Type     | Default                          | ENV Variable                  | Description                                           |
| ------------------- | -------- | -------------------------------- | ----------------------------- | ----------------------------------------------------- |
| `apiKey`            | `string` | `""`                             | `TOGETHER_API_KEY`            | Together AI API key _(Required)_                      |
| `model`             | `string` | `"meta-llama/Llama-Vision-Free"` | `TOGETHER_DEFAULT_MODEL`      | Default Together AI model to use                      |
| `maxTokens`         | `number` | `200`                            | `TOGETHER_MAX_TOKENS`         | Maximum number of tokens per response                 |
| `temperature`       | `number` | `0.3`                            | `TOGETHER_TEMPERATURE`        | Sampling temperature for response randomness          |
| `topP`              | `number` | `0.7`                            | `TOGETHER_TOP_P`              | Top-p (nucleus sampling) value                        |
| `topK`              | `number` | `50`                             | `TOGETHER_TOP_K`              | Top-k sampling value                                  |
| `repetitionPenalty` | `number` | `1.2`                            | `TOGETHER_REPETITION_PENALTY` | Repetition penalty for controlling repeated responses |

### **Using Environment Variables**

Instead of defining options in the code, you can set them as environment variables:

```env
TOGETHER_API_KEY=your-api-key
TOGETHER_DEFAULT_MODEL=meta-llama/Llama-Vision-Free
TOGETHER_MAX_TOKENS=200
TOGETHER_TEMPERATURE=0.3
TOGETHER_TOP_P=0.7
TOGETHER_TOP_K=50
TOGETHER_REPETITION_PENALTY=1.2
```

---

## 📌 **How to Use**

After installation, you can use the Together AI provider to generate text and analyze images.

### **Get Together Provider**

```typescript
import { getTogetherProvider } from "@tsdiapi/together";

const together = getTogetherProvider();
```

### **Basic Chat Completion**

```typescript
const response = await together.chat("Tell me a joke!");
console.log(response.result);
```

### **Analyze an Image**

```typescript
const response = await together.analyzeImage(
  "https://example.com/image.jpg",
  "Describe this image."
);
console.log(response.result);
```

---

## 🔗 **Related Plugins**

You can find more **TSDIAPI** plugins here:  
🔗 [Available Plugins](https://www.npmjs.com/search?q=%40tsdiapi)

---

## 👨‍💻 **Contributing**

Contributions are always welcome! Feel free to submit issues or pull requests to improve this plugin.

📧 **Contact:** unbywyd@gmail.com

🚀 Happy coding with **TSDIAPI** & Together AI! 🎉
