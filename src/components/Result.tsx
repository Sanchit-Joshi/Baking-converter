import React,{useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import { getBakingTips } from '../utils/gemini';

interface ResultProps {
  grams: number | null;
  ingredient?: string;
}

export function Result({ grams, ingredient }: ResultProps) {
  const [tip, setTip] = useState<string>('');

  useEffect(() => {
    if (ingredient) {
      getBakingTips(ingredient)
        .then(setTip)
        .catch(console.error);
    }
  }, [ingredient]);

  if (grams === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg text-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="text-4xl font-bold text-blue-500 mb-2"
      >
        {grams}g
      </motion.div>
      <p className="text-gray-600 mb-4">precise measurement</p>
      {tip && (
        <div className="text-sm text-gray-700 mt-4 p-4 bg-blue-50 rounded">
          <span className="font-semibold">Baking Tip:</span> {tip}
        </div>
      )}
    </motion.div>
  );
}