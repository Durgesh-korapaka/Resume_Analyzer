// ResumeUploader.js
import React, { useState } from 'react';
import { uploadResume } from '../api';
import ResumeDetails from './ResumeDetails';

export default function ResumeUploader() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setAnalysis(null);
    setError(null);
  };

  const onUpload = async () => {
    if (!file) return setError('Please choose a PDF file.');
    if (file.type !== 'application/pdf') return setError('Only PDF files accepted.');
    setLoading(true);
    setError(null);
    try {
      const res = await uploadResume(file);
      setAnalysis(res.data.analysis);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Live Resume Analysis</h2>
      <input type="file" accept="application/pdf" onChange={onFileChange} />
      <div style={{ marginTop: 8 }}>
        <button onClick={onUpload} disabled={loading}>
          {loading ? 'Analyzing...' : 'Upload & Analyze'}
        </button>
      </div>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      {analysis && (
        <div style={{ marginTop: 20 }}>
          <h3>Analysis Result</h3>
          <ResumeDetails data={analysis} />
        </div>
      )}
    </div>
  );
}
