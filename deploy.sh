#!/bin/bash

# ScourgifyData - Quick Deployment Script
# This script automates the deployment process

set -e

echo "🚀 ScourgifyData Deployment Script"
echo "===================================="

# Check prerequisites
echo "✓ Checking prerequisites..."

if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi

if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed"
    exit 1
fi

echo "✓ All prerequisites found"

# Push to GitHub
echo ""
echo "📤 Pushing to GitHub..."
git add .
git commit -m "Deploy: Update models and frontend" || echo "No changes to commit"
git push origin main

echo ""
echo "✅ Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Go to https://render.com"
echo "2. Create 2 Web Services for the models (Model 1 & Model 2)"
echo "3. Create 1 Static Site for the frontend"
echo "4. Update API URLs in frontend environment variables"
echo ""
echo "See DEPLOYMENT_GUIDE.md for detailed instructions"
