import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(){
  return (
    <header className="nav">
      <div className="navbar">
        <div className="brand">
          <div className="logo">🐾</div>
          <div>
            Lost &amp; Found Pets
            <div style={{fontSize:12, color:'#6b7280'}}>Help reunite furry friends</div>
          </div>
        </div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/lost-pets">Lost Pets</Link>
          <Link to="/found-pets">Found Pets</Link>
          <Link to="/add-lost" className="cta">Report Lost</Link>
          <Link to="/add-found" className="cta">Report Found</Link>
        </nav>
      </div>
    </header>
  );
}
