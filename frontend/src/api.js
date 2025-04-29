import axios from 'axios';
const API = 'http://localhost:5000/api';

// Candidates
export const getAllCandidates = params => axios.get(`${API}/candidates`, { params });
export const uploadResume     = data   => axios.post(`${API}/candidates`, data);
export const matchJobs         = id     => axios.get(`${API}/candidates/${id}/match`);
export const addExperience     = (id,exp)=> axios.post(`${API}/candidates/${id}/experience`, exp);

// Jobs
export const getJobs           = params => axios.get(`${API}/jobs`, { params });
export const createJob         = job    => axios.post(`${API}/jobs`, job);



export const updateExperience         = (id, data) => axios.put(`${API}/candidates/${id}/experience`, data);
export const deleteExperience         = (id, data) => axios.delete(`${API}/candidates/${id}/experience`, { data });
export const batchUpdateExperience    = data => axios.put(`${API}/candidates/experience/batch`, data);
export const updateJob                = (id, reqs) => axios.put(`${API}/jobs/${id}`, reqs);
export const deleteJob                = id => axios.delete(`${API}/jobs/${id}`);