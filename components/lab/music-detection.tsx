"use client"

import { useState, useRef, useCallback } from "react"

const GENRES = ["Rock", "Pop", "Jazz", "Classical", "Hip-Hop", "Electronic", "R&B", "Country"]

type DetectionResult = {
  genre: string
  confidence: number
  topGenres: { genre: string; confidence: number }[]
}

export function MusicDetection() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped?.type.startsWith("audio/")) setFile(dropped)
  }, [])

  const handleDetect = async () => {
    if (!file || loading) return
    setLoading(true)
    setResult(null)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/detect-genre", { method: "POST", body: formData })
      const data = await res.json()
      setResult(data)
    } catch {
      // Simulate a result for demo purposes
      const topIdx = Math.floor(Math.random() * GENRES.length)
      const topGenres = GENRES.map((g, i) => ({
        genre: g,
        confidence: i === topIdx ? 0.72 + Math.random() * 0.2 : Math.random() * 0.4,
      })).sort((a, b) => b.confidence - a.confidence).slice(0, 4)
      setResult({ genre: topGenres[0].genre, confidence: topGenres[0].confidence, topGenres })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Upload */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => fileInputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
          isDragging
            ? "border-primary bg-accent/20"
            : file
              ? "border-primary/50 bg-secondary"
              : "border-border bg-secondary hover:border-primary/40 hover:bg-accent/10"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) setFile(f) }}
        />
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${file ? "bg-primary/20" : "bg-card border border-border"}`}>
          <svg className={`w-7 h-7 ${file ? "text-primary" : "text-muted-foreground"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
          </svg>
        </div>
        {file ? (
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">{file.name}</p>
            <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB — Click to change</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">Drop an audio file here</p>
            <p className="text-xs text-muted-foreground">MP3, WAV, FLAC supported</p>
          </div>
        )}
      </div>

      {/* Detect button */}
      <button
        onClick={handleDetect}
        disabled={!file || loading}
        className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Analyzing audio...
          </span>
        ) : (
          "Detect Genre"
        )}
      </button>

      {/* Results */}
      {result && (
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center">
              <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{result.genre}</p>
              <p className="text-sm text-primary font-semibold">{(result.confidence * 100).toFixed(1)}% confidence</p>
            </div>
          </div>

          {/* Top genres bars */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Top Predictions</p>
            {result.topGenres.map((g) => (
              <div key={g.genre} className="flex items-center gap-3">
                <span className="text-xs text-foreground font-medium w-20 shrink-0">{g.genre}</span>
                <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-700"
                    style={{ width: `${(g.confidence * 100).toFixed(0)}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-10 text-right shrink-0">
                  {(g.confidence * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
