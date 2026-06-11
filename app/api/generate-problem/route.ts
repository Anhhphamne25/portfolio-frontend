import { generateText, Output } from "ai"
import { z } from "zod"

export async function POST(req: Request) {
  const { difficulty, language, topic } = await req.json()

  const { experimental_output } = await generateText({
    model: "openai/gpt-4o-mini",
    output: Output.object({
      schema: z.object({
        title: z.string().describe("Short, catchy problem title"),
        description: z.string().describe("Clear problem description (2–3 sentences)"),
        examples: z.array(
          z.object({
            input: z.string(),
            output: z.string(),
          })
        ).describe("2 example input/output pairs"),
        constraints: z.array(z.string()).describe("3–4 constraints"),
      }),
    }),
    prompt: `Generate a ${difficulty} coding problem focused on ${topic} for ${language}. 
Make it realistic and educational. Provide a title, description, 2 examples, and 3-4 constraints.`,
  })

  return Response.json(experimental_output)
}
