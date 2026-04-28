"use client";
import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface GeneratedProduct {
  title: string;
  description: string;
  category: string;
  suggestedPrice?: number;
}

interface Props {
  onGenerated: (data: GeneratedProduct) => void;
}

export default function AIDescriptionGenerator({ onGenerated }: Props) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onGenerated(data);
      toast.success("AI generated your product details!");
    } catch (err) {
      toast.error("AI generation failed. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-br from-sela-light to-emerald-50 border border-sela-green/20 rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={18} className="text-sela-green" />
        <span className="font-display font-semibold text-sm text-sela-dark">
          AI Product Assistant
        </span>
        <span className="text-xs bg-sela-green text-white px-2 py-0.5 rounded-full ml-auto">
          Powered by Gemini
        </span>
      </div>

      <p className="text-xs text-gray-500 mb-3">
        Describe your product in Darja, French, or English — AI will generate a professional listing.
      </p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        // Using curly braces and backticks handles the quotes and special characters safely
        placeholder={`e.g. "عندي تيشيرتات جديدة بكل الألوان بسعر مناسب" or "J'ai des écouteurs Bluetooth neufs…"`}
        rows={3}
        className="input-field resize-none text-sm mb-3"
      />

      <button
        onClick={handleGenerate}
        disabled={loading || !input.trim()}
        className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Generating…
          </>
        ) : (
          <>
            <Sparkles size={16} />
            Generate with AI
          </>
        )}
      </button>
    </div>
  );
}
