@echo off
REM ScourgifyData - Quick Deployment Script for Windows
REM This script automates the deployment process

setlocal enabledelayedexpansion

echo.
echo 🚀 ScourgifyData Deployment Script
echo ====================================

REM Check prerequisites
echo.
echo Checking prerequisites...

where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Git is not installed
    exit /b 1
)

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed
    exit /b 1
)

where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Python 3 is not installed
    exit /b 1
)

echo ✓ All prerequisites found
echo.

REM Push to GitHub
echo 📤 Pushing to GitHub...
git add .
git commit -m "Deploy: Update models and frontend" 2>nul || echo No changes to commit
git push origin main

echo.
echo ✅ Deployment preparation complete!
echo.
echo Next steps:
echo 1. Go to https://render.com
echo 2. Create 2 Web Services for the models (Model 1 & Model 2)
echo 3. Create 1 Static Site for the frontend
echo 4. Update API URLs in frontend environment variables
echo.
echo See DEPLOYMENT_GUIDE.md for detailed instructions
echo.

pause
