import React, { useState } from 'react';
import { Scale, ChefHat } from 'lucide-react';
import { ingredientDatabase } from '../data/ingredients';
import { getConversionFromGemini, analyzeRecipe, RecipeAnalysis } from '../utils/gemini';

interface ConversionFormProps {
  onConvert: (grams: number) => void;
  onRecipeAnalysis?: (analysis: RecipeAnalysis) => void;
}

export function ConversionForm({ onConvert, onRecipeAnalysis }: ConversionFormProps) {
  const [loading, setLoading] = useState(false);
  const [ingredient, setIngredient] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('cups');
  const [recipe, setRecipe] = useState('');
  const [mode, setMode] = useState<'convert' | 'recipe'>('convert');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'convert') {
        const grams = await getConversionFromGemini(
          ingredient,
          parseFloat(amount),
          unit
        );
        onConvert(grams);
      } else if (mode === 'recipe' && onRecipeAnalysis) {
        const analysis = await analyzeRecipe(recipe);
        onRecipeAnalysis(analysis);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderConversionForm = () => {
    return (
      <div className="space-y-6">
        <div className="relative">
          <label htmlFor="ingredient" className="block text-sm font-medium text-gray-700 mb-2">
            Ingredient
          </label>
          <select
            id="ingredient"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 appearance-none"
          >
            <option value="">Select an ingredient</option>
            {Object.entries(ingredientDatabase).map(([key, value]) => (
              <option key={key} value={key}>
                {value.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="relative">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              min="0"
              step="0.1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
              placeholder="Enter amount"
            />
          </div>

          <div className="relative">
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-2">
              Unit
            </label>
            <select
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 appearance-none"
            >
              <option value="cups">Cups</option>
              <option value="tablespoon">Tablespoons</option>
              <option value="teaspoon">Teaspoons</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  const renderRecipeForm = () => {
    return (
      <div className="space-y-4">
        <div className="relative">
          <label htmlFor="recipe" className="block text-sm font-medium text-gray-700 mb-2">
            Enter Your Recipe
          </label>
          <textarea
            id="recipe"
            value={recipe}
            onChange={(e) => setRecipe(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
            rows={6}
            placeholder="Paste your recipe here..."
          />
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md transition-all duration-300 hover:shadow-xl">
      <div className="flex space-x-2 mb-8 bg-gray-100 p-1 rounded-lg">
        <button
          type="button"
          onClick={() => setMode('convert')}
          className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 ${mode === 'convert' ? 'bg-blue-500 text-white shadow-md transform scale-105' : 'bg-transparent text-gray-600 hover:bg-gray-200'}`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Scale className="w-4 h-4" />
            <span>Convert Units</span>
          </div>
        </button>
        <button
          type="button"
          onClick={() => setMode('recipe')}
          className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 ${mode === 'recipe' ? 'bg-blue-500 text-white shadow-md transform scale-105' : 'bg-transparent text-gray-600 hover:bg-gray-200'}`}
        >
          <div className="flex items-center justify-center space-x-2">
            <ChefHat className="w-4 h-4" />
            <span>Analyze Recipe</span>
          </div>
        </button>
      </div>

      <div className="transition-all duration-300 transform">
        {mode === 'convert' ? renderConversionForm() : renderRecipeForm()}
      </div>

      <button
        type="submit"
        className={`w-full mt-8 py-4 px-6 rounded-lg flex items-center justify-center space-x-3 text-white font-medium transition-all duration-300 transform hover:scale-102 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg'}`}
        disabled={loading}
      >
        {mode === 'convert' ? (
          <>
            <Scale className="w-5 h-5" />
            <span>{loading ? 'Converting...' : 'Convert to Grams'}</span>
          </>
        ) : (
          <>
            <ChefHat className="w-5 h-5" />
            <span>{loading ? 'Analyzing...' : 'Analyze Recipe'}</span>
          </>
        )}
      </button>
    </form>
  );
}