// PastResumesTable.js
import React, { useEffect, useState } from 'react';
import { fetchAll, fetchById } from '../api';
import ResumeDetails from './ResumeDetails';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function PastResumesTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await fetchAll();
      setRows(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function openDetails(id) {
    try {
      const res = await fetchById(id);
      setSelected(res.data);
      setModalOpen(true);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Historical Viewer</h2>
      {loading ? <div>Loading...</div> : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>#</th><th>Name</th><th>Email</th><th>File</th><th>Uploaded At</th><th>Rating</th><th>Details</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={r.id}>
                <td>{idx + 1}</td>
                <td>{r.name || '—'}</td>
                <td>{r.email || '—'}</td>
                <td>{r.file_name}</td>
                <td>{new Date(r.uploaded_at).toLocaleString()}</td>
                <td>{r.resume_rating ?? '—'}</td>
                <td><button onClick={() => openDetails(r.id)}>Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Resume Details"
        style={{ content: { maxWidth: '800px', margin: 'auto' } }}
      >
        <button onClick={() => setModalOpen(false)}>Close</button>
        {selected ? (
          <div>
            <h3>{selected.file_name}</h3>
            <ResumeDetails data={{
              name: selected.name,
              email: selected.email,
              phone: selected.phone,
              linkedin_url: selected.linkedin_url,
              portfolio_url: selected.portfolio_url,
              summary: selected.summary,
              work_experience: selected.work_experience,
              education: selected.education,
              technical_skills: selected.technical_skills,
              soft_skills: selected.soft_skills,
              projects: selected.projects,
              certifications: selected.certifications,
              resume_rating: selected.resume_rating,
              improvement_areas: selected.improvement_areas,
              upskill_suggestions: selected.upskill_suggestions
            }} />
          </div>
        ) : <div>Loading...</div>}
      </Modal>
    </div>
  );
}
