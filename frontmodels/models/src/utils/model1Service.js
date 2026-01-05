/**
 * Model 1 Service - Logistic Regression with TF-IDF
 * Client-side only implementation using keyword-based analysis
 */

/**
 * Make prediction with Model 1 using client-side logic
 * @param {string} text - Input text for prediction
 * @returns {Promise<Object>}
 */
export async function predictWithModel1(text) {
  try {
    if (!text || text.trim().length === 0) {
      throw new Error("Input text cannot be empty");
    }

    return fallbackPrediction(text);
  } catch (error) {
    console.error(`Prediction error in Model 1: ${error.message}`);
    throw error;
  }
}

/**
 * Client-side prediction using keyword analysis
 * Simulates logistic regression with TF-IDF behavior
 * @param {string} text - Input text
 * @returns {Object}
 */
function fallbackPrediction(text) {
  const cleaned = text.toLowerCase();

  // These words simulate TF-IDF feature importance
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
    "wonderful",
    "lovely",
    "fantastic",
    "impressive",
    "delightful",
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
    "dreadful",
    "mediocre",
    "unpleasant",
    "unacceptable",
    "dull",
    "boring",
    "waste",
  ];

  // Count positive and negative words
  const posCount = positiveWords.filter((word) =>
    cleaned.includes(word)
  ).length;
  const negCount = negativeWords.filter((word) =>
    cleaned.includes(word)
  ).length;

  let prediction;
  let confidence;

  // Determine sentiment based on word counts
  if (negCount > posCount) {
    prediction = 0; // Negative
    confidence = Math.min(0.95, 0.6 + negCount * 0.15);
  } else if (posCount > negCount) {
    prediction = 2; // Positive
    confidence = Math.min(0.95, 0.6 + posCount * 0.15);
  } else {
    prediction = 1; // Neutral
    confidence = 0.5 + Math.random() * 0.2;
  }

  const sentiments = {
    0: "Negative",
    1: "Neutral",
    2: "Positive",
  };

  return {
    sentiment: sentiments[prediction],
    score: prediction,
    confidence: Math.round(confidence * 100) / 100,
    text: text,
    modelType: "Logistic Regression",
    model: "Model 1",
    usingFallback: true,
    source: "client-side",
  };
}
