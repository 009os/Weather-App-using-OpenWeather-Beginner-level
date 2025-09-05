#!/bin/bash

echo "🌤️  Setting up Weather API Project..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env file from example
echo "🔧 Setting up environment variables..."
cp env.example .env

echo "✅ Setup complete!"
echo ""
echo "🚀 Next steps:"
echo "1. Get your free OpenWeather API key from: https://openweathermap.org/api"
echo "2. Edit .env file and add your API key"
echo "3. Run: npm run start:dev"
echo "4. Visit: http://localhost:3000/api for Swagger documentation"
echo ""
echo "Happy coding! 🌟"
