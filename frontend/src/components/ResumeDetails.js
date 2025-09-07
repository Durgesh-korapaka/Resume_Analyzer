// ResumeDetails.js
import React from 'react';

export default function ResumeDetails({ data }) {
  if (!data) return null;

  return (
    <div style={{ border: '1px solid #ccc', padding: 12, borderRadius: 6 }}>
      <h4>{data.name || 'Name not found'}</h4>
      <div>
        <strong>Email:</strong> {data.email || '—'} <br />
        <strong>Phone:</strong> {data.phone || '—'} <br />
        <strong>LinkedIn:</strong> {data.linkedin_url || '—'} <br />
        <strong>Portfolio:</strong> {data.portfolio_url || '—'}
      </div>

      <hr />
      <div>
        <strong>Summary:</strong>
        <p>{data.summary || '—'}</p>
      </div>

      <div>
        <strong>Work Experience:</strong>
        {Array.isArray(data.work_experience) && data.work_experience.length ? (
          data.work_experience.map((we, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <div><strong>{we.role}</strong> — {we.company} ({we.duration})</div>
              {we.description && we.description.length > 0 && (
                <ul>
                  {we.description.map((d, j) => <li key={j}>{d}</li>)}
                </ul>
              )}
            </div>
          ))
        ) : <div>—</div>}
      </div>

      <div>
        <strong>Education:</strong>
        {Array.isArray(data.education) && data.education.length ? (
          data.education.map((edu, i) => (
            <div key={i}>{edu.degree} — {edu.institution} ({edu.graduation_year})</div>
          ))
        ) : <div>—</div>}
      </div>

      <div>
        <strong>Technical Skills:</strong>
        <div>{Array.isArray(data.technical_skills) ? data.technical_skills.join(', ') : '—'}</div>
      </div>

      <div>
        <strong>Soft Skills:</strong>
        <div>{Array.isArray(data.soft_skills) ? data.soft_skills.join(', ') : '—'}</div>
      </div>

      <div>
        <strong>Projects:</strong>
        {Array.isArray(data.projects) && data.projects.length ? (
          data.projects.map((p, i) => (
            <div key={i}>
              <strong>{p.name}</strong>
              <div>{p.description}</div>
              <div>Technologies: {Array.isArray(p.technologies) ? p.technologies.join(', ') : ''}</div>
            </div>
          ))
        ) : <div>—</div>}
      </div>

      <div>
        <strong>Certifications:</strong>
        <div>{Array.isArray(data.certifications) ? data.certifications.join(', ') : '—'}</div>
      </div>

      <hr />
      <div>
        <strong>Resume Rating:</strong> {data.resume_rating ?? '—'}
      </div>
      <div>
        <strong>Improvement Areas:</strong>
        <p>{data.improvement_areas || '—'}</p>
      </div>
      <div>
        <strong>Upskill Suggestions:</strong>
        <div>{Array.isArray(data.upskill_suggestions) ? data.upskill_suggestions.join(', ') : '—'}</div>
      </div>
    </div>
  );
}
