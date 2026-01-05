import sys
import os
from pathlib import Path

# Test backend startup
print("=" * 60)
print("Testing ScourgifyData Backend Startup")
print("=" * 60)

# Check Python version
print(f"\n✓ Python version: {sys.version}")

# Test imports
print("\nTesting imports...")
try:
    import flask
    print("  ✓ Flask imported successfully")
except ImportError as e:
    print(f"  ✗ Flask import failed: {e}")
    sys.exit(1)

try:
    from flask_cors import CORS
    print("  ✓ Flask-CORS imported successfully")
except ImportError as e:
    print(f"  ✗ Flask-CORS import failed: {e}")
    sys.exit(1)

try:
    import tensorflow as tf
    print("  ✓ TensorFlow imported successfully")
except ImportError as e:
    print(f"  ✗ TensorFlow import failed: {e}")
    sys.exit(1)

try:
    import numpy as np
    print("  ✓ NumPy imported successfully")
except ImportError as e:
    print(f"  ✗ NumPy import failed: {e}")
    sys.exit(1)

# Test app initialization
print("\nInitializing Flask app...")
try:
    from app import app
    print("  ✓ Flask app initialized successfully")
except Exception as e:
    print(f"  ✗ Flask app initialization failed: {e}")
    sys.exit(1)

# Test endpoints exist
print("\nChecking endpoints...")
routes = [rule.rule for rule in app.url_map.iter_rules()]
print(f"  Found {len(routes)} routes:")
for route in sorted(routes):
    print(f"    - {route}")

# Summary
print("\n" + "=" * 60)
print("✅ Backend is ready for deployment!")
print("=" * 60)
print("\nNext steps:")
print("  1. Run: python app.py")
print("  2. Test: curl http://localhost:5000/")
print("  3. Make prediction: curl -X POST http://localhost:5000/api/predict/model1")
print("=" * 60)
