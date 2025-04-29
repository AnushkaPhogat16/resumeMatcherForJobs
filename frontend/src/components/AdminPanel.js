import React, { useState } from 'react';
import axios from 'axios';

export default function AdminPanel() {
  const [dbs, setDbs] = useState([]);
  const [cols, setCols] = useState([]);
  const [dropName, setDropName] = useState('');
  const [searchReqs, setSearchReqs] = useState('');
  const [searchMode, setSearchMode] = useState('in');
  const [searchResults, setSearchResults] = useState([]);
  const [skillSearch, setSkillSearch] = useState('');
  const [candResults, setCandResults] = useState([]);
  const [findName, setFindName] = useState('');
  const [foundCand, setFoundCand] = useState(null);
  const [bulkField, setBulkField] = useState('');
  const [bulkValue, setBulkValue] = useState('');

  const api = axios.create({ baseURL: 'http://localhost:5000/api' });

  const listDBs = async () => {
    const res = await api.get('/admin/databases');
    setDbs(res.data);
  };
  const listCols = async () => {
    const res = await api.get('/admin/collections');
    setCols(res.data);
  };
  const dropCol = async () => {
    await api.delete(`/admin/collections/${dropName}`);
    setDropName('');
    listCols();
  };
  const searchJobs = async () => {
    const res = await api.get('/jobs/search', { params: { reqs: searchReqs, mode: searchMode } });
    setSearchResults(res.data);
  };
  const searchCands = async () => {
    const res = await api.get('/candidates/search', { params: { skill: skillSearch } });
    setCandResults(res.data);
  };
  const findOneCand = async () => {
    try {
      const res = await api.get('/candidates/findone', { params: { name: findName } });
      setFoundCand(res.data);
    } catch {
      setFoundCand(null);
    }
  };
  const bulkUpdate = async () => {
    const res = await api.post('/jobs/bulk-update', { field: bulkField, value: bulkValue });
    alert(`Modified ${res.data.modifiedCount} documents`);
  };

  return (
    <div className="mt-8 p-4 border rounded bg-gray-50">
      <h2 className="text-xl font-bold mb-2">Admin / MongoDB Ops</h2>

      <div className="space-y-4">
        <div>
          <button onClick={listDBs} className="mr-2 bg-blue-600 text-white px-2 rounded">List DBs</button>
          {dbs.join(', ')}
        </div>

        <div>
          <button onClick={listCols} className="mr-2 bg-blue-600 text-white px-2 rounded">List Collections</button>
          {cols.join(', ')}
        </div>

        <div className="flex space-x-2">
          <input
            placeholder="Collection to drop"
            value={dropName}
            onChange={e => setDropName(e.target.value)}
            className="border px-2"
          />
          <button onClick={dropCol} className="bg-red-600 text-white px-2 rounded">Drop</button>
        </div>

        <div className="flex space-x-2">
          <input
            placeholder="Reqs csv"
            value={searchReqs}
            onChange={e => setSearchReqs(e.target.value)}
            className="border px-2"
          />
          <select
            value={searchMode}
            onChange={e => setSearchMode(e.target.value)}
            className="border px-2"
          >
            <option value="in">$in</option>
            <option value="all">$all</option>
          </select>
          <button onClick={searchJobs} className="bg-green-600 text-white px-2 rounded">Search Jobs</button>
        </div>
        <ul>
          {searchResults.map(j => <li key={j._id}>{j.title} [{j.requirements.join(', ')}]</li>)}
        </ul>

        <div className="flex space-x-2">
          <input
            placeholder="Candidate skill"
            value={skillSearch}
            onChange={e => setSkillSearch(e.target.value)}
            className="border px-2"
          />
          <button onClick={searchCands} className="bg-green-600 text-white px-2 rounded">Search Cands</button>
        </div>
        <ul>
          {candResults.map(c => <li key={c._id}>{c.name} [skills: {c.skills.join(', ')}]</li>)}
        </ul>

        <div className="flex space-x-2">
          <input
            placeholder="FindOne candidate name"
            value={findName}
            onChange={e => setFindName(e.target.value)}
            className="border px-2"
          />
          <button onClick={findOneCand} className="bg-indigo-600 text-white px-2 rounded">FindOne</button>
        </div>
        {foundCand && (
          <div className="p-2 border rounded">
            {foundCand.name} — skills: {foundCand.skills.join(', ')}
          </div>
        )}

        <div className="flex space-x-2">
          <input
            placeholder="Bulk field"
            value={bulkField}
            onChange={e => setBulkField(e.target.value)}
            className="border px-2"
          />
          <input
            placeholder="Value"
            value={bulkValue}
            onChange={e => setBulkValue(e.target.value)}
            className="border px-2"
          />
          <button onClick={bulkUpdate} className="bg-purple-600 text-white px-2 rounded">Bulk Update Jobs</button>
        </div>
      </div>
    </div>
  );
}
