import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export async function getConversionFromGemini(ingredient: string, amount: number, unit: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Convert ${amount} ${unit} of ${ingredient} to grams. 
    Return only the number without any units or explanation.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  return parseFloat(text);
}

export async function getBakingTips(ingredient: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Provide a short baking tip for using ${ingredient} in recipes.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}