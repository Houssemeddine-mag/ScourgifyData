#!/bin/bash
# Setup script for local development

echo "🔧 Setting up ScourgifyData for local development..."

# Backend setup
echo ""
echo "📦 Setting up backend..."
cd backend

# Create virtual environment
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "✓ Virtual environment created"
fi

# Activate virtual environment
source venv/bin/activate 2>/dev/null || . venv/Scripts/activate

# Install dependencies
pip install -r requirements.txt
echo "✓ Backend dependencies installed"

# Return to root
cd ..

# Frontend setup
echo ""
echo "🎨 Setting up frontend..."
cd frontmodels/models

# Install node dependencies
npm install
echo "✓ Frontend dependencies installed"

# Return to root
cd ../..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo ""
echo "Terminal 1 - Start Backend:"
echo "  cd backend"
echo "  source venv/bin/activate  # On Windows: venv\\Scripts\\activate"
echo "  python app.py"
echo ""
echo "Terminal 2 - Start Frontend:"
echo "  cd frontmodels/models"
echo "  npm run dev"
echo ""
echo "Open browser: http://localhost:5173"
echo ""
echo "💡 Make sure the sentiment_model.keras file exists at:"
echo "   notebooks/2nd model/sentiment_model.keras"
