import React, { useState } from 'react';
import { createJob } from '../api';

export default function NewJobForm({ onCreated }) {
  const [title, setTitle] = useState('');
  const [reqs, setReqs]   = useState('');
  const [error, setError] = useState('');

  const handle = async () => {
    setError('');
    if (!title || !reqs) {
      setError('Title and at least one requirement.');
      return;
    }
    const arr = reqs.split(',').map(r => r.trim()).filter(r => r);
    try {
      const res = await createJob({ title, description: '', requirements: arr });
      onCreated(res.data);
      setTitle(''); setReqs('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create job.');
    }
  };

  return (
    <div className="mb-4 p-2 border rounded">
      <h2 className="text-lg font-bold">New Job</h2>
      <div className="flex space-x-2 mt-2">
        <input
          placeholder="Job Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border px-2 py-1 flex-1"
        />
        <input
          placeholder="Requirements, comma-sep"
          value={reqs}
          onChange={e => setReqs(e.target.value)}
          className="border px-2 py-1 flex-1"
        />
        <button onClick={handle} className="bg-blue-600 text-white px-3 rounded">Create</button>
      </div>
      {error && <div className="text-red-500 mt-1">{error}</div>}
    </div>
  );
}
