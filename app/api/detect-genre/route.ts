// In a real system, this would run a trained PyTorch model (LibROSA + CNN/LSTM)
// For the demo, we simulate a realistic genre detection response

const GENRES = ["Rock", "Pop", "Jazz", "Classical", "Hip-Hop", "Electronic", "R&B", "Country"]

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get("file") as File

  // Use file size as a simple seed for deterministic demo output
  const seed = file ? file.size % 100 : 42
  const topIdx = Math.floor(seededRandom(seed) * GENRES.length)
  const topConfidence = 0.65 + seededRandom(seed + 1) * 0.25

  const topGenres = GENRES.map((genre, i) => ({
    genre,
    confidence:
      i === topIdx
        ? topConfidence
        : seededRandom(seed + i + 2) * (1 - topConfidence) * 0.6,
  }))
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 4)

  return Response.json({
    genre: topGenres[0].genre,
    confidence: topGenres[0].confidence,
    topGenres,
  })
}
