// services/analysisService.js
const pdfParse = require('pdf-parse');
const { GenerativeAI } = require('@google/generative-ai'); // hypothetical import shape
require('dotenv').config();

const modelName = 'models/text-bison-001'; // example; adapt to actual model name

// Initialize client
const client = new GenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  projectId: process.env.GOOGLE_PROJECT_ID,
  location: process.env.GOOGLE_LOCATION || 'us-central1'
});

/**
 * Extract text from PDF buffer
 */
async function extractTextFromPdf(buffer) {
  try {
    const data = await pdfParse(buffer);
    return data.text || '';
  } catch (err) {
    throw new Error('Failed to parse PDF: ' + err.message);
  }
}

/**
 * Build robust prompt to get consistent JSON
 */
function buildPrompt(resumeText) {
  return `
You are an expert technical recruiter and career coach.  Analyze the resume text below and return ONLY a valid JSON object that exactly matches the specified schema. Do not include explanatory text, markdown, or any additional keys. If a field is missing, use null or empty arrays. Provide reasonable parsing for phone and emails if present.

Resume Text:
"""${resumeText}"""

Return JSON with this structure:
{
  "name": null | "string",
  "email": null | "string",
  "phone": null | "string",
  "linkedin_url": null | "string",
  "portfolio_url": null | "string",
  "summary": null | "string",
  "work_experience": [ { "role": "string", "company": "string", "duration": "string", "description": ["string"] } ],
  "education": [ { "degree": "string", "institution": "string", "graduation_year": "string" } ],
  "technical_skills": [ "string" ],
  "soft_skills": [ "string" ],
  "projects": [ { "name":"string", "description":"string", "technologies":["string"] } ],
  "certifications": [ "string" ],
  "resume_rating": 1,
  "improvement_areas": "string",
  "upskill_suggestions": ["string"]
}

Constraints:
- Resume rating must be an integer from 1 to 10.
- improvement_areas should be a short paragraph.
- upskill_suggestions should be short list (3-7 items).
- JSON must be valid (no trailing commas).
- If multiple possible values, choose most probable.
  `;
}

/**
 * Send prompt to Gemini / Generative API and parse result
 */
async function callLLMForStructuredData(resumeText) {
  const prompt = buildPrompt(resumeText);

  // Adjust the call below to the exact SDK usage for your version.
  // This is a generic example — adapt as necessary to the real @google/generative-ai SDK signature.
  const response = await client.generateText({
    model: modelName,
    prompt,
    maxOutputTokens: 800
  });

  const text = response?.content?.[0]?.text ?? response?.text ?? ''; // adapt to actual response shape

  // Attempt to find JSON in LLM response
  const jsonStart = text.indexOf('{');
  const jsonEnd = text.lastIndexOf('}');
  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error('LLM did not return a JSON object.');
  }
  const jsonText = text.slice(jsonStart, jsonEnd + 1);
  let parsed;
  try {
    parsed = JSON.parse(jsonText);
  } catch (err) {
    // attempt to fix simple cases (single quotes, trailing commas) - minimal
    let cleaned = jsonText.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');
    cleaned = cleaned.replace(/,(\s*[}\]])/g, '$1');
    parsed = JSON.parse(cleaned);
  }

  return parsed;
}

module.exports = {
  extractTextFromPdf,
  callLLMForStructuredData
};
