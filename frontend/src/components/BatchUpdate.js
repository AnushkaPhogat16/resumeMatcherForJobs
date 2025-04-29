import React, { useState } from 'react';
import { batchUpdateExperience } from '../api';

export default function BatchUpdate() {
  const [skill, setSkill] = useState('MongoDB');
  const [inc, setInc] = useState(1);
  const [result, setResult] = useState(null);

  const run = async () => {
    const res = await batchUpdateExperience({ skill, inc });
    setResult(res.data.modifiedCount + ' documents modified');
  };

  return (
    <div>
      <h2>Batch Update Experience</h2>
      <input placeholder="Skill filter" value={skill} onChange={e=>setSkill(e.target.value)} />
      <input type="number" placeholder="Increment yrs" value={inc} onChange={e=>setInc(e.target.value)} />
      <button onClick={run}>Run</button>
      {result && <div>{result}</div>}
    </div>
  );
}