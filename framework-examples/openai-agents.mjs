import fs from "node:fs/promises";
import OpenAI from "openai";
import { Agent, Runner, functionTool } from "@openai/agents";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const summarizeDocument = functionTool({
  name: "summarize_document",
  description: "Summarize a local document before handing it to the AI assistant.",
  parameters: {
    type: "object",
    properties: {
      path: { type: "string" }
    },
    required: ["path"]
  },
  async execute({ path }) {
    const content = await fs.readFile(path, "utf8");
    return content.slice(0, 2500);
  }
});

const assistant = new Agent({
  name: "nutrient-ai-assistant",
  instructions:
    "You help users review document content and plan the next processing step.",
  tools: [summarizeDocument]
});

async function main() {
  const result = await Runner.run(assistant, "Summarize README.md.");
  console.log(result.finalOutput);
}

void main();
