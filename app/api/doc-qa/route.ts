import { generateText } from "ai"

export async function POST(req: Request) {
  const formData = await req.formData()
  const question = formData.get("question") as string
  const file = formData.get("file") as File

  // In a real RAG system, you'd extract PDF text and perform vector search.
  // For demo, we'll simulate a document-aware response.
  const fileName = file?.name ?? "the document"

  const { text } = await generateText({
    model: "openai/gpt-4o-mini",
    system: `You are a helpful document Q&A assistant. The user uploaded a PDF called "${fileName}". 
Since you cannot actually read the PDF in this demo, respond helpfully by:
1. Acknowledging the document name
2. Providing a thoughtful, plausible answer to the question as if you had read it
3. Mentioning that in the full RAG system, answers are grounded in actual document excerpts with source references

Keep answers concise (3–4 sentences).`,
    prompt: question,
    maxOutputTokens: 300,
  })

  return Response.json({ answer: text })
}
