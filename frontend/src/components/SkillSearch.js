import React, { useState } from 'react';
import { getJobs } from '../api';

export default function SkillSearch() {
  const [skill, setSkill] = useState('');
  const [jobs, setJobs]   = useState([]);

  const search = async () => {
    const res = await getJobs({ req: skill });
    setJobs(res.data);
  };

  return (
    <>
      <div className="input-group mb-3">
        <input
          className="form-control"
          placeholder="Skill"
          value={skill}
          onChange={e=>setSkill(e.target.value)}
        />
        <button className="btn btn-success" onClick={search}>Search</button>
      </div>
      <ul className="list-group">
        {jobs.map(j=> <li key={j._id} className="list-group-item">{j.title}</li>)}
      </ul>
    </>
  );
}
