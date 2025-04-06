# Baking Converter

A modern web application that converts common baking measurements (cups, tablespoons, teaspoons) into precise gram measurements for consistent baking results. Powered by Google's Generative AI for accurate conversions.

## Features

- Convert various baking measurements to grams
- Support for common baking ingredients
- Real-time conversion using Google's Generative AI
- Beautiful, responsive user interface
- Smooth animations and transitions

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for modern, responsive design
- **Animation**: Framer Motion for smooth transitions
- **AI Integration**: Google Generative AI (@google/generative-ai)
- **Build Tool**: Vite
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Google AI API key:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Usage

1. Select an ingredient from the dropdown menu
2. Enter the amount
3. Choose the unit (cups, tablespoons, or teaspoons)
4. Click "Convert to Grams" to get the precise measurement

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and not licensed for public use.
