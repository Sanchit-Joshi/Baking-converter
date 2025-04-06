import React, { useState } from 'react';
import { Scale } from 'lucide-react';
import { ConversionForm } from './components/ConversionForm';
import { Result } from './components/Result';

function App() {
  const [grams, setGrams] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Scale className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Baking Converter
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Convert vague baking measurements into precise gram measurements for consistent, perfect results every time.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 mb-8 transform hover:scale-[1.01] transition-transform duration-200">
          <ConversionForm onConvert={setGrams} />
        </div>

        {grams !== null && (
          <Result grams={grams} />
        )}
      </div>
    </div>
  );
}

export default App;