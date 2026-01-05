#!/usr/bin/env python3
"""
Final Backend Verification Script
Tests all endpoints and confirms deployment readiness
"""

import requests
import json
import sys
from datetime import datetime

BASE_URL = "http://localhost:5000"
TESTS_PASSED = 0
TESTS_FAILED = 0

def test_endpoint(name, method, endpoint, data=None):
    """Test an API endpoint"""
    global TESTS_PASSED, TESTS_FAILED
    
    try:
        url = f"{BASE_URL}{endpoint}"
        if method == "GET":
            response = requests.get(url, timeout=10)
        else:
            response = requests.post(url, json=data, timeout=10)
        
        if response.status_code == 200:
            print(f"✅ {name}")
            print(f"   Status: {response.status_code}")
            result = response.json()
            if 'prediction' in result:
                pred = result['prediction']
                print(f"   Sentiment: {pred.get('sentiment', 'N/A')}")
                print(f"   Confidence: {pred.get('confidence', 'N/A'):.2%}")
            elif 'status' in result:
                print(f"   Status: {result['status']}")
            TESTS_PASSED += 1
            return True
        else:
            print(f"❌ {name}")
            print(f"   Status: {response.status_code}")
            print(f"   Error: {response.text}")
            TESTS_FAILED += 1
            return False
    except Exception as e:
        print(f"❌ {name}")
        print(f"   Error: {str(e)}")
        TESTS_FAILED += 1
        return False

def main():
    print("\n" + "="*70)
    print("🚀 ScourgifyData Backend - Final Verification")
    print("="*70)
    print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Base URL: {BASE_URL}")
    print("="*70 + "\n")
    
    # Test 1: Health Check
    print("1️⃣  Health Check")
    print("-" * 70)
    test_endpoint(
        "GET /",
        "GET",
        "/"
    )
    print()
    
    # Test 2: Model 1 Prediction
    print("2️⃣  Model 1 Prediction")
    print("-" * 70)
    test_endpoint(
        "POST /api/predict/model1",
        "POST",
        "/api/predict/model1",
        {"text": "This hotel was absolutely amazing and fantastic!"}
    )
    print()
    
    # Test 3: Model 2 Prediction
    print("3️⃣  Model 2 Prediction")
    print("-" * 70)
    test_endpoint(
        "POST /api/predict/model2",
        "POST",
        "/api/predict/model2",
        {"text": "This was terrible and disappointing, really awful!"}
    )
    print()
    
    # Test 4: Compare Models
    print("4️⃣  Compare Models")
    print("-" * 70)
    test_endpoint(
        "POST /api/compare",
        "POST",
        "/api/compare",
        {"text": "The service was good but the food was not very good"}
    )
    print()
    
    # Test 5: Neutral Sentiment
    print("5️⃣  Neutral Sentiment Test")
    print("-" * 70)
    test_endpoint(
        "POST /api/predict/model1 (Neutral)",
        "POST",
        "/api/predict/model1",
        {"text": "It was okay, nothing special but nothing bad either"}
    )
    print()
    
    # Summary
    print("="*70)
    print("📊 Test Results Summary")
    print("="*70)
    total_tests = TESTS_PASSED + TESTS_FAILED
    print(f"Total Tests: {total_tests}")
    print(f"Passed:      {TESTS_PASSED} ✅")
    print(f"Failed:      {TESTS_FAILED} ❌")
    print("="*70)
    
    if TESTS_FAILED == 0:
        print("\n✅ ALL TESTS PASSED! Backend is ready for deployment!")
        print("\nNext steps:")
        print("  1. Push to GitHub: git push origin main")
        print("  2. Deploy to Render (follow DEPLOYMENT_QUICKREF.md)")
        print("  3. Update frontend API URLs in .env.production")
        print("="*70 + "\n")
        return 0
    else:
        print(f"\n❌ {TESTS_FAILED} test(s) failed. Check logs above.")
        print("="*70 + "\n")
        return 1

if __name__ == "__main__":
    sys.exit(main())
