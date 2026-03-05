import { ChatOpenAI } from "@langchain/openai";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

const processDocumentTool = tool(
  async ({ inputPath, operation }) => {
    return {
      status: "queued",
      inputPath,
      operation,
      nextStep: "Call your Nutrient endpoint or MCP server with this payload."
    };
  },
  {
    name: "process_document",
    description: "Prepare a document-processing request for Nutrient workflows.",
    schema: z.object({
      inputPath: z.string(),
      operation: z.enum(["ocr", "extract_text", "redact", "convert"])
    })
  }
);

async function main() {
  const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4.1-mini"
  }).bindTools([processDocumentTool]);

  const response = await model.invoke(
    "Queue OCR for ./assets/invoice-scan.pdf and explain what happens next."
  );

  const toolCalls = response.tool_calls ?? response.toolCalls ?? [];
  if (toolCalls.length > 0) {
    for (const call of toolCalls) {
      if (call.name !== "process_document") continue;
      const args = typeof call.args === "string" ? JSON.parse(call.args) : call.args;
      const toolResult = await processDocumentTool.invoke(args);
      console.log("Tool result:", toolResult);
    }
    return;
  }

  console.log(response.content);
}

void main();
