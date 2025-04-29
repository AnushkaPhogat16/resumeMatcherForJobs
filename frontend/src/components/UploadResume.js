import React, { useState } from 'react';
import { uploadResume, matchJobs } from '../api';

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [education, setEdu] = useState('');
  const [cand, setCand] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [err, setErr] = useState('');

  const handle = async () => {
    setErr('');
    if (!file || !name) { setErr('Name and PDF required'); return; }
    const fd = new FormData();
    fd.append('resume', file);
    fd.append('name', name);
    fd.append('skills', skills);
    fd.append('education', education);
    try {
      const res = await uploadResume(fd);
      setCand(res.data);
      const m = await matchJobs(res.data._id);
      setJobs(m.data);
    } catch (e) {
      setErr(e.response?.data?.error || 'Error');
    }
  };

  return (
    <>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input className="form-control" value={name} onChange={e=>setName(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Skills (comma-sep)</label>
        <input className="form-control" value={skills} onChange={e=>setSkills(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Education</label>
        <input className="form-control" value={education} onChange={e=>setEdu(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Resume PDF</label>
        <input type="file" className="form-control" onChange={e=>setFile(e.target.files[0])} />
      </div>
      <button className="btn btn-primary" onClick={handle}>Upload & Match</button>
      {err && <div className="text-danger mt-2">{err}</div>}

      {cand && (
        <div className="mt-4">
          <h5>{cand.name}</h5>
          <p><strong>Skills:</strong> {cand.skills.join(', ')}</p>
          <p><strong>Education:</strong> {cand.education}</p>
        </div>
      )}

      <h5 className="mt-4">Matched Jobs</h5>
      <ul className="list-group">
        {jobs.map(j=> <li key={j._id} className="list-group-item">{j.title}</li>)}
      </ul>
    </>
  );
}
