import React from 'react';
import PetCard from '../components/PetCard';

function getStored(key){ try { return JSON.parse(localStorage.getItem(key)||'[]'); } catch(e){ return []; } }

export default function LostList(){
  const items = getStored('lostPets').slice().reverse();
  return (
    <div className="container">
      <h2>All Reported Lost Pets</h2>
      <div className="card-grid">
        {items.length ? items.map(p=> <PetCard key={p.id} pet={p} type="Lost" />) : <div>No reports yet.</div>}
      </div>
    </div>
  );
}
