import React from 'react';

export default function PetCard({pet, type}){
  return (
    <div className="pet-card">
      <img src={pet.image || 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=6b0d0f3f'} alt={pet.name || 'pet'} />
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <div style={{fontWeight:700}}>{pet.name || (pet.type || 'Unknown')}</div>
          <div className="small">{pet.breed || ''} · {pet.location || ''}</div>
        </div>
        <div style={{textAlign:'right', fontSize:12}}>{type}</div>
      </div>
      <p className="small" style={{marginTop:8}}>
        {pet.description && pet.description.length>120 ? pet.description.slice(0,120)+'...' : pet.description}
      </p>
    </div>
  );
}
