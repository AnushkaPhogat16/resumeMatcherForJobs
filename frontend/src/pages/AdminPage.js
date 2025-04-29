import React, { useEffect, useState } from 'react';
import { getJobs, getAllCandidates, createJob } from '../api';

export default function AdminPage() {
  const [jobs, setJobs] = useState([]);
  const [cands, setCands] = useState([]);
  const [skillFilter, setSkillFilter] = useState('');

  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newReqs, setNewReqs] = useState('');
  const [jobError, setJobError] = useState('');

  useEffect(() => {
    fetchJobs();
    fetchCands();
  }, []);

  const fetchJobs = async () => {
    const res = await getJobs();
    setJobs(res.data);
  };
  const fetchCands = async (skill) => {
    const res = await getAllCandidates(skill ? { skill } : {});
    setCands(res.data);
  };
  const handleCreateJob = async () => {
    setJobError('');
    if (!newTitle || !newReqs) {
      setJobError('Title and requirements required.');
      return;
    }
    try {
      await createJob({
        title: newTitle,
        description: newDesc,
        requirements: newReqs.split(',').map(r=>r.trim())
      });
      setNewTitle(''); setNewDesc(''); setNewReqs('');
      fetchJobs();
    } catch (err) {
      setJobError(err.response?.data?.error || 'Failed to create');
    }
  };

  return (
    <div>
      <h1 className="mb-4">Admin Dashboard</h1>

      <div className="card mb-4">
        <div className="card-header">All Job Listings</div>
        <ul className="list-group list-group-flush">
          {jobs.map(j => (
            <li key={j._id} className="list-group-item">
              <strong>{j.title}</strong><br/>
              {j.description && <small>{j.description}</small>}<br/>
              <em>Reqs:</em> {j.requirements.join(', ')}
            </li>
          ))}
        </ul>
      </div>

      <div className="card mb-4">
        <div className="card-header">Add New Job</div>
        <div className="card-body">
          <div className="mb-2">
            <input
              className="form-control"
              placeholder="Job Title"
              value={newTitle} onChange={e=>setNewTitle(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <textarea
              className="form-control"
              placeholder="Description"
              value={newDesc} onChange={e=>setNewDesc(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              className="form-control"
              placeholder="Requirements (comma-separated)"
              value={newReqs} onChange={e=>setNewReqs(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleCreateJob}>
            Create Job
          </button>
          {jobError && <div className="text-danger mt-2">{jobError}</div>}
        </div>
      </div>

      <div className="card">
        <div className="card-header">Search Candidates by Skill</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <input
              className="form-control"
              placeholder="Skill"
              value={skillFilter}
              onChange={e=>setSkillFilter(e.target.value)}
            />
            <button
              className="btn btn-success"
              onClick={()=>fetchCands(skillFilter)}
            >Search</button>
          </div>
          <ul className="list-group">
            {cands.map(c => (
              <li key={c._id} className="list-group-item">
                {c.name} <br/>
                <small>Skills: {c.skills.join(', ')}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
