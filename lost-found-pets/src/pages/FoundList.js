import React from 'react';
import PetCard from '../components/PetCard';

function getStored(key){ try { return JSON.parse(localStorage.getItem(key)||'[]'); } catch(e){ return []; } }

export default function FoundList(){
  const items = getStored('foundPets').slice().reverse();
  return (
    <div className="container">
      <h2>All Reported Found Pets</h2>
      <div className="card-grid">
        {items.length ? items.map(p=> <PetCard key={p.id} pet={p} type="Found" />) : <div>No reports yet.</div>}
      </div>
    </div>
  );
}
