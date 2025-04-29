import React, { useEffect, useState } from 'react';
import { getJobs, updateJob, deleteJob } from '../api';
import NewJobForm from './NewJobForm';

export default function JobList() {
  const [jobs, setJobs]   = useState([]);
  const [filter, setFilter] = useState('');

  const fetch = async (req) => {
    const res = await getJobs(req);
    setJobs(res.data);
  };

  useEffect(() => { fetch(filter); }, [filter]);

  return (
    <div>
      <h2 className="text-lg font-bold">Jobs</h2>

      <div className="flex space-x-2 my-2">
        <input
          placeholder="Filter by requirement"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border px-2 py-1 flex-1"
        />
        <button onClick={() => fetch(filter)} className="bg-gray-500 text-white px-3 rounded">Search</button>
      </div>

      <NewJobForm onCreated={job => setJobs([...jobs, job])} />

      <ul className="space-y-2">
        {jobs.map(j => (
          <li key={j._id} className="border p-2 rounded flex justify-between items-center">
            <div>
              <strong>{j.title}</strong><br/>
              Req: {j.requirements.join(', ')}
            </div>
            <div className="space-x-2">
              <button
                onClick={async () => {
                  const toAdd = window.prompt('Requirement to add:');
                  if (toAdd) {
                    const res = await updateJob(j._id, { requirements: [toAdd] });
                    setJobs(jobs.map(x => x._id===j._id ? res.data : x));
                  }
                }}
                className="bg-yellow-500 text-white px-2 rounded"
              >
                Add Req
              </button>
              <button
                onClick={async () => {
                  if (window.confirm('Delete this job?')) {
                    await deleteJob(j._id);
                    setJobs(jobs.filter(x => x._id!==j._id));
                  }
                }}
                className="bg-red-600 text-white px-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
