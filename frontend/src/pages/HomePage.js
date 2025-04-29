import React from 'react';
import UploadResume from '../components/UploadResume';
import SkillSearch from '../components/SkillSearch';

export default function HomePage() {
  return (
    <div>
      <h1 className="mb-4">Candidate Portal</h1>

      <div className="card mb-4">
        <div className="card-header">Upload Resume &amp; Match</div>
        <div className="card-body">
          <UploadResume />
        </div>
      </div>

      <div className="card">
        <div className="card-header">Search Jobs by Skill</div>
        <div className="card-body">
          <SkillSearch />
        </div>
      </div>
    </div>
  );
}
