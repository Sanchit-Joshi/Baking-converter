import React, { useState } from 'react';
import { ConversionForm } from './components/ConversionForm';
import { Result } from './components/Result';
import { RecipeResult } from './components/RecipeResult';
import { RecipeAnalysis } from './utils/gemini';

export default function App() {
  const [grams, setGrams] = useState<number | null>(null);
  const [ingredient, setIngredient] = useState<string>('');
  const [recipeAnalysis, setRecipeAnalysis] = useState<RecipeAnalysis | null>(null);

  const handleConversion = (convertedGrams: number) => {
    setGrams(convertedGrams);
    setRecipeAnalysis(null);
  };

  const handleRecipeAnalysis = (analysis: RecipeAnalysis) => {
    setRecipeAnalysis(analysis);
    setGrams(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Baking Assistant</h1>
          <p className="text-lg text-gray-600">Convert measurements and analyze recipes</p>
        </div>

        <div className="max-w-xl mx-auto space-y-8">
          <ConversionForm 
            onConvert={handleConversion}
            onRecipeAnalysis={handleRecipeAnalysis}
          />
          {grams !== null && <Result grams={grams} ingredient={ingredient} />}
          {recipeAnalysis && <RecipeResult analysis={recipeAnalysis} />}
        </div>
      </div>
    </div>
  );
}