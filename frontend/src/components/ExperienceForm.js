import React, { useState } from 'react';
import { addExperience } from '../api';

export default function ExperienceForm({ candidateId, onAdded }) {
  const [company, setCompany]   = useState('');
  const [role, setRole]         = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError]       = useState('');

  const handle = async () => {
    setError('');
    if (!company || !role || !duration) {
      setError('All fields required.');
      return;
    }
    try {
      await addExperience(candidateId, { company, role, duration });
      setCompany(''); setRole(''); setDuration('');
      onAdded();
    } catch {
      setError('Failed to add experience.');
    }
  };

  return (
    <div className="mt-4 p-2 border rounded">
      <h3 className="font-semibold">Add Experience</h3>
      <div className="flex space-x-2 mt-2">
        <input placeholder="Company"   value={company}   onChange={e => setCompany(e.target.value)}   className="border px-2 py-1"/>
        <input placeholder="Role"      value={role}      onChange={e => setRole(e.target.value)}         className="border px-2 py-1"/>
        <input placeholder="Duration"  value={duration}  onChange={e => setDuration(e.target.value)}    className="border px-2 py-1"/>
        <button onClick={handle} className="bg-green-500 text-white px-3 rounded">Add</button>
      </div>
      {error && <div className="text-red-500 mt-1">{error}</div>}
    </div>
  );
}
