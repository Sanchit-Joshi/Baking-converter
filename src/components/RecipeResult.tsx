import React from 'react';
import { motion } from 'framer-motion';
import { RecipeAnalysis } from '../utils/gemini';

interface RecipeResultProps {
  analysis: RecipeAnalysis;
}

export function RecipeResult({ analysis }: RecipeResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto"
    >
      <motion.h2
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="text-3xl font-bold text-blue-500 mb-4 text-center"
      >
        {analysis.title}
      </motion.h2>

      <div className="mb-6 text-gray-600 text-center italic">
        {analysis.description}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div className="bg-blue-50 p-3 rounded-lg">
          <span className="font-semibold">Cooking Time:</span> {analysis.cookingTime}
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <span className="font-semibold">Difficulty:</span> {analysis.difficulty}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Ingredients</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          {analysis.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Instructions</h3>
        <ol className="list-decimal list-inside space-y-3 text-gray-600">
          {analysis.instructions.map((instruction, index) => (
            <li key={index} className="leading-relaxed">{instruction}</li>
          ))}
        </ol>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Pro Tips</h3>
        <ul className="list-none space-y-2">
          {analysis.tips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span className="text-gray-600">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}