// App.js
import React, { useState } from 'react';
import ResumeUploader from './components/ResumeUploader';
import PastResumesTable from './components/PastResumesTable';

function App() {
  const [tab, setTab] = useState('analyze');

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <header style={{ padding: 16, borderBottom: '1px solid #eee' }}>
        <h1>Resume Analyzer</h1>
        <nav style={{ marginTop: 8 }}>
          <button onClick={() => setTab('analyze')} disabled={tab === 'analyze'}>Live Analysis</button>
          <button onClick={() => setTab('history')} disabled={tab === 'history'}>History</button>
        </nav>
      </header>
      <main>
        {tab === 'analyze' && <ResumeUploader />}
        {tab === 'history' && <PastResumesTable />}
      </main>
    </div>
  );
}

export default App;
