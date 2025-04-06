import React, { useState } from 'react';
import { Scale } from 'lucide-react';
import { ingredientDatabase } from '../data/ingredients';
import { getConversionFromGemini } from '../utils/gemini';

interface ConversionFormProps {
  onConvert: (grams: number) => void;
}

export function ConversionForm({ onConvert }: ConversionFormProps) {
  const [loading, setLoading] = useState(false);
  const [ingredient, setIngredient] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('cups');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const grams = await getConversionFromGemini(
        ingredient,
        parseFloat(amount),
        unit
      );
      onConvert(grams);
    } catch (error) {
      console.error('Conversion error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div className="space-y-4">
        <div>
          <label htmlFor="ingredient" className="block text-sm font-medium text-gray-700 mb-1">
            Ingredient
          </label>
          <select
            id="ingredient"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            {Object.entries(ingredientDatabase).map(([key, value]) => (
              <option key={key} value={key}>
                {value.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              min="0"
              step="0.1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
              Unit
            </label>
            <select
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="cup">Cups</option>
              <option value="tablespoon">Tablespoons</option>
              <option value="teaspoon">Teaspoons</option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
      >
        <Scale className="w-5 h-5" />
        <span>Convert to Grams</span>
      </button>
    </form>
  );
}