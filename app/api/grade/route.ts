import { generateText, Output } from "ai"
import { z } from "zod"

export async function POST(req: Request) {
  const { code, problem } = await req.json()

  const { experimental_output } = await generateText({
    model: "openai/gpt-4o-mini",
    output: Output.object({
      schema: z.object({
        score: z.number().describe("Score from 0–100"),
        verdict: z.string().describe("Short verdict like 'Correct', 'Partially Correct', 'Wrong Answer', 'Needs Improvement'"),
        feedback: z.string().describe("2–4 sentences of constructive AI feedback"),
        testResults: z.array(
          z.object({
            input: z.string(),
            expected: z.string(),
            passed: z.boolean(),
          })
        ).describe("2–3 test case results"),
      }),
    }),
    prompt: `You are a code grader. The user submitted Python code for the "${problem}" problem.

Code:
\`\`\`python
${code}
\`\`\`

Grade the code (0–100), give a short verdict, 2–4 sentences of feedback, and generate 2–3 example test case results (simulate whether they pass). Be honest and constructive.`,
  })

  return Response.json(experimental_output)
}
