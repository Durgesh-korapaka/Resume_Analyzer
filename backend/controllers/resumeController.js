// controllers/resumeController.js
const db = require('../db');
const analysisService = require('../services/analysisService');

async function uploadResume(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Parse PDF
    const text = await analysisService.extractTextFromPdf(req.file.buffer);

    // Call LLM to extract structured JSON
    const structured = await analysisService.callLLMForStructuredData(text);

    // Prepare values for DB (use nulls if missing)
    const {
      name = null,
      email = null,
      phone = null,
      linkedin_url = null,
      portfolio_url = null,
      summary = null,
      work_experience = [],
      education = [],
      technical_skills = [],
      soft_skills = [],
      projects = [],
      certifications = [],
      resume_rating = null,
      improvement_areas = null,
      upskill_suggestions = []
    } = structured;

    const insertQuery = `
      INSERT INTO resumes
      (file_name, name, email, phone, linkedin_url, portfolio_url, summary,
       work_experience, education, technical_skills, soft_skills, projects, certifications,
       resume_rating, improvement_areas, upskill_suggestions)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9::jsonb,$10::jsonb,$11::jsonb,$12::jsonb,$13::jsonb,$14,$15,$16::jsonb)
      RETURNING id, uploaded_at;
    `;

    const values = [
      req.file.originalname,
      name, email, phone, linkedin_url, portfolio_url, summary,
      JSON.stringify(work_experience),
      JSON.stringify(education),
      JSON.stringify(technical_skills),
      JSON.stringify(soft_skills),
      JSON.stringify(projects),
      JSON.stringify(certifications),
      resume_rating,
      improvement_areas,
      JSON.stringify(upskill_suggestions)
    ];

    const result = await db.query(insertQuery, values);
    const newRow = result.rows[0];

    // Return combined payload
    return res.status(201).json({
      id: newRow.id,
      uploaded_at: newRow.uploaded_at,
      file_name: req.file.originalname,
      analysis: structured
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}

async function getAllResumes(req, res) {
  try {
    const q = `SELECT id, file_name, name, email, uploaded_at, resume_rating FROM resumes ORDER BY uploaded_at DESC`;
    const result = await db.query(q);
    return res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch resumes' });
  }
}

async function getResumeById(req, res) {
  try {
    const id = req.params.id;
    const q = `SELECT * FROM resumes WHERE id = $1`;
    const result = await db.query(q, [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' });
    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch resume' });
  }
}

module.exports = {
  uploadResume,
  getAllResumes,
  getResumeById
};
