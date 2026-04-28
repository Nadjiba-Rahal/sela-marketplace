import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface GeneratedProduct {
  title: string;
  description: string;
  category: string;
  suggestedPrice?: number;
}

export async function generateProductDetails(
  rawInput: string
): Promise<GeneratedProduct> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are an assistant for an Algerian online marketplace called Sela.
A seller described their product in informal language (Darja, French, or English):

"${rawInput}"

Generate a professional product listing in English with:
1. A clear, SEO-friendly title (max 8 words)
2. A compelling product description (2-3 sentences)
3. The best matching category from this list: electronics, fashion, beauty, home, food, auto, handmade, kids, sports, tools, books, services
4. A suggested price in DZD (Algerian Dinar) based on typical Algerian market prices

Respond ONLY with valid JSON, no markdown, exactly this format:
{
  "title": "...",
  "description": "...",
  "category": "...",
  "suggestedPrice": 0
}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  // Strip possible markdown code fences
  const clean = text.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(clean) as GeneratedProduct;
  } catch {
    throw new Error("Gemini returned invalid JSON. Raw: " + text);
  }
}
