import React from 'react';

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container" style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap'}}>
        <div>
          <strong>Lost & Found Pets</strong><br/>
          © {new Date().getFullYear()} — Reunite pets with owners
        </div>
        <div className="links">
          <a href="#">Home</a>
          <a href="#" style={{marginLeft:8}}>About</a>
          <a href="#" style={{marginLeft:8}}>Contact</a>
          <a href="#" style={{marginLeft:8}}>Privacy</a>
        </div>
      </div>
    </footer>
  );
}
