@echo off
REM Setup script for local development (Windows)

echo.
echo 🔧 Setting up ScourgifyData for local development...
echo.

REM Backend setup
echo 📦 Setting up backend...
cd backend

REM Create virtual environment
if not exist "venv" (
    python -m venv venv
    echo ✓ Virtual environment created
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install dependencies
pip install -r requirements.txt
echo ✓ Backend dependencies installed

REM Return to root
cd ..

REM Frontend setup
echo.
echo 🎨 Setting up frontend...
cd frontmodels\models

REM Install node dependencies
call npm install
echo ✓ Frontend dependencies installed

REM Return to root
cd ..\..

echo.
echo ✅ Setup complete!
echo.
echo 📝 Next steps:
echo.
echo Terminal 1 - Start Backend:
echo   cd backend
echo   venv\Scripts\activate
echo   python app.py
echo.
echo Terminal 2 - Start Frontend:
echo   cd frontmodels\models
echo   npm run dev
echo.
echo Open browser: http://localhost:5173
echo.
echo 💡 Make sure the sentiment_model.keras file exists at:
echo    notebooks\2nd model\sentiment_model.keras
echo.
pause
