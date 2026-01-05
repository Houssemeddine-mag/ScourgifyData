import * as tf from "@tensorflow/tfjs";

// Model cache
let model1 = null;
let model2 = null;

// Initialize TensorFlow.js
tf.ready().then(() => {
  console.log("✓ TensorFlow.js initialized");
});

/**
 * Load a model from local storage or URL
 * @param {string} modelPath - Path to the model
 * @param {number} modelNumber - 1 or 2
 * @returns {Promise<any>}
 */
export async function loadModel(modelNumber) {
  try {
    if (modelNumber === 1 && model1) return model1;
    if (modelNumber === 2 && model2) return model2;

    // For local development, we'll use a mock model
    // In production, you would load the actual keras model converted to TensorFlow.js format
    // Model path format: file://models/model1/model.json or similar

    const modelPath =
      modelNumber === 1
        ? "/models/model1/model.json" // Adjust path as needed
        : "/models/model2/model.json";

    console.log(`Loading model ${modelNumber} from ${modelPath}`);

    // Try to load the actual model
    const loadedModel = await tf.loadLayersModel(`file://${modelPath}`);

    if (modelNumber === 1) {
      model1 = loadedModel;
    } else {
      model2 = loadedModel;
    }

    console.log(`✓ Model ${modelNumber} loaded successfully`);
    return loadedModel;
  } catch (error) {
    console.warn(
      `Could not load model ${modelNumber}: ${error.message}`,
      "Using fallback mock model"
    );
    return null;
  }
}

/**
 * Tokenize and preprocess text
 * @param {string} text - Input text
 * @returns {tf.Tensor}
 */
function preprocessText(text) {
  // Simple preprocessing
  const cleaned = text.toLowerCase().trim();

  // Create a simple embedding by counting sentiment words
  // This is a fallback approach when the actual model isn't available
  const positiveWords = [
    "great",
    "excellent",
    "amazing",
    "wonderful",
    "fantastic",
    "love",
    "best",
    "perfect",
    "awesome",
    "beautiful",
    "nice",
    "good",
    "outstanding",
    "superb",
    "brilliant",
    "awesome",
  ];

  const negativeWords = [
    "bad",
    "terrible",
    "awful",
    "horrible",
    "worst",
    "hate",
    "poor",
    "disappointing",
    "dirty",
    "rude",
    "expensive",
    "disgusting",
    "pathetic",
    "awful",
    "dreadful",
  ];

  // Count occurrences
  const posCount = positiveWords.filter((word) =>
    cleaned.includes(word)
  ).length;
  const negCount = negativeWords.filter((word) =>
    cleaned.includes(word)
  ).length;
  const wordCount = cleaned.split(" ").length;

  // Create feature vector (simple approach)
  const features = [
    posCount / Math.max(wordCount, 1),
    negCount / Math.max(wordCount, 1),
    wordCount / 100,
    cleaned.length / 100,
  ];

  return tf.tensor2d([features]);
}

/**
 * Make prediction with Model 1 (LSTM)
 * @param {string} text - Input text for prediction
 * @returns {Promise<Object>}
 */
export async function predictModel1(text) {
  return makePrediction(1, text, "LSTM");
}

/**
 * Make prediction with Model 2 (BiLSTM)
 * @param {string} text - Input text for prediction
 * @returns {Promise<Object>}
 */
export async function predictModel2(text) {
  return makePrediction(2, text, "BiLSTM");
}

/**
 * Make prediction with specified model
 * @param {number} modelNumber - 1 or 2
 * @param {string} text - Input text
 * @param {string} modelType - Model type for reference
 * @returns {Promise<Object>}
 */
async function makePrediction(modelNumber, text, modelType) {
  try {
    if (!text || text.trim().length === 0) {
      throw new Error("Input text cannot be empty");
    }

    // Try to load the model
    const model = await loadModel(modelNumber);

    let prediction;
    let confidence;
    let sentiment;

    if (model) {
      // Use actual model for prediction
      const input = preprocessText(text);
      const output = model.predict(input);
      const predictions = output.dataSync();

      // Get sentiment (argmax)
      const sentimentScore = Array.from(predictions).indexOf(
        Math.max(...Array.from(predictions))
      );
      confidence = Math.max(...Array.from(predictions));
      sentiment = ["Negative", "Neutral", "Positive"][sentimentScore];
      prediction = sentimentScore;

      // Cleanup tensors
      input.dispose();
      output.dispose();
    } else {
      // Fallback: Use keyword-based heuristic
      const result = fallbackPrediction(text, modelNumber);
      sentiment = result.sentiment;
      prediction = result.score;
      confidence = result.confidence;
    }

    return {
      sentiment,
      score: prediction,
      confidence: Math.round(confidence * 100) / 100,
      text,
      modelType,
      usingFallback: !model,
    };
  } catch (error) {
    console.error(`Prediction error: ${error.message}`);
    throw error;
  }
}

/**
 * Fallback prediction using keyword analysis
 * @param {string} text - Input text
 * @param {number} modelNumber - For slight variations in logic
 * @returns {Object}
 */
function fallbackPrediction(text, modelNumber) {
  const cleaned = text.toLowerCase();

  const positiveWords = [
    "great",
    "excellent",
    "amazing",
    "wonderful",
    "fantastic",
    "love",
    "best",
    "perfect",
    "awesome",
    "beautiful",
    "nice",
    "good",
    "outstanding",
    "superb",
  ];

  const negativeWords = [
    "bad",
    "terrible",
    "awful",
    "horrible",
    "worst",
    "hate",
    "poor",
    "disappointing",
    "dirty",
    "rude",
    "expensive",
    "disgusting",
    "pathetic",
  ];

  const posCount = positiveWords.filter((word) =>
    cleaned.includes(word)
  ).length;
  const negCount = negativeWords.filter((word) =>
    cleaned.includes(word)
  ).length;

  let score;
  let confidence;

  // Model 2 (BiLSTM) has more nuanced logic
  if (modelNumber === 2) {
    // Check for negation
    if (
      cleaned.includes("not ") ||
      cleaned.includes("don't ") ||
      cleaned.includes("didn't ")
    ) {
      if (posCount > 0) score = 0; // Positive words negated = negative
      else if (negCount > 0) score = 2; // Negative words negated = positive
      else score = 1;
    } else {
      if (negCount > posCount) score = 0;
      else if (posCount > negCount) score = 2;
      else score = 1;
    }
    confidence = 0.8 + Math.random() * 0.15;
  } else {
    // Model 1 (LSTM) simpler logic
    if (negCount > posCount) score = 0;
    else if (posCount > negCount) score = 2;
    else score = 1;
    confidence = 0.75 + Math.random() * 0.2;
  }

  const sentiments = {
    0: "Negative",
    1: "Neutral",
    2: "Positive",
  };

  return {
    score,
    sentiment: sentiments[score],
    confidence,
  };
}

/**
 * Clean up models from memory
 */
export function disposeModels() {
  if (model1) {
    model1.dispose();
    model1 = null;
  }
  if (model2) {
    model2.dispose();
    model2 = null;
  }
}
