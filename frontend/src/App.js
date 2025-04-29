import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">ResumeMatcher</NavLink>
          <div>
            <NavLink className="nav-link d-inline text-light" to="/">Home</NavLink>
            <NavLink className="nav-link d-inline text-light" to="/admin">Admin</NavLink>
          </div>
        </div>
      </nav>
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </>
  );
}
