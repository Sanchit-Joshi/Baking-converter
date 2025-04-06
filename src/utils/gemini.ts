import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export async function getConversionFromGemini(ingredient: string, amount: number, unit: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Convert ${amount} ${unit} of ${ingredient} to grams. 
    Return only the number without any units or explanation.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  return parseFloat(text);
}

export async function getBakingTips(ingredient: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Provide a short baking tip for using ${ingredient} in recipes.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export interface RecipeAnalysis {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  tips: string[];
  cookingTime: string;
  difficulty: string;
}

export async function analyzeRecipe(recipeText: string): Promise<RecipeAnalysis> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Analyze this recipe and format it into a clear structure. Please provide:

Title: [Title of the dish]
Description: [A brief description]
Cooking Time: [Estimated time]
Difficulty: [Easy/Medium/Hard]

Ingredients:
[List each ingredient with measurements on new lines, prefixed with -]

Instructions:
[Number each step, starting from 1]

Pro Tips:
[List 3 tips, each prefixed with -]

Analyze this recipe:
${recipeText}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  try {
    // Parse the response into structured data
    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
    const analysis: RecipeAnalysis = {
      title: '',
      description: '',
      ingredients: [],
      instructions: [],
      tips: [],
      cookingTime: '',
      difficulty: ''
    };

    let currentSection = '';
    for (const line of lines) {
      if (line.toLowerCase().includes('title:')) {
        analysis.title = line.split(':')[1].trim();
      } else if (line.toLowerCase().includes('description:')) {
        analysis.description = line.split(':')[1].trim();
      } else if (line.toLowerCase().includes('ingredients:')) {
        currentSection = 'ingredients';
      } else if (line.toLowerCase().includes('instructions:')) {
        currentSection = 'instructions';
      } else if (line.toLowerCase().includes('tips:')) {
        currentSection = 'tips';
      } else if (line.toLowerCase().includes('cooking time:')) {
        analysis.cookingTime = line.split(':')[1].trim();
      } else if (line.toLowerCase().includes('difficulty:')) {
        analysis.difficulty = line.split(':')[1].trim();
      } else if (line.startsWith('-') || line.match(/^\d+\./) || line.match(/^[•●]/)) {
        const content = line.replace(/^[-•●\d.]+\s*/, '').trim();
        if (currentSection === 'ingredients') analysis.ingredients.push(content);
        else if (currentSection === 'instructions') analysis.instructions.push(content);
        else if (currentSection === 'tips') analysis.tips.push(content);
      }
    }

    return analysis;
  } catch (error) {
    console.error('Error parsing recipe analysis:', error);
    throw new Error('Failed to analyze recipe');
  }
}