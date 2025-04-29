import React, { useState } from 'react';
import { updateExperience, deleteExperience } from '../api';

export default function ExperienceList({ candidateId, experience, onRefresh }) {
  const [editing, setEditing] = useState({});

  const handleUpdate = async (title) => {
    const years = window.prompt('New years for ' + title);
    if (years != null) {
      await updateExperience(candidateId, { title, years });
      onRefresh();
    }
  };

  const handleDelete = async (title) => {
    if (window.confirm('Delete ' + title + '?')) {
      await deleteExperience(candidateId, { title });
      onRefresh();
    }
  };

  return (
    <div>
      <h4>Experience</h4>
      <ul>
        {experience.map(exp => (
          <li key={exp.title}>
            {exp.title} @ {exp.company} — {exp.years} yrs
            <button onClick={()=>handleUpdate(exp.title)}>Edit</button>
            <button onClick={()=>handleDelete(exp.title)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}