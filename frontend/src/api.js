// api.js
import axios from 'axios';

const base = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';

export const uploadResume = (file) => {
  const form = new FormData();
  form.append('resume', file);
  return axios.post(`${base}/resumes/upload`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const fetchAll = () => axios.get(`${base}/resumes`);
export const fetchById = (id) => axios.get(`${base}/resumes/${id}`);
