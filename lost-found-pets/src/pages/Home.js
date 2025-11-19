import React from 'react';
import { Link } from 'react-router-dom';
import PetCard from '../components/PetCard';

function getStored(key){ try { return JSON.parse(localStorage.getItem(key)||'[]'); } catch(e){ return []; } }

export default function Home(){
  const lost = getStored('lostPets').slice().reverse().slice(0,4);
  const found = getStored('foundPets').slice().reverse().slice(0,4);

  return (
    <div>
      <section className="hero container">
        <div className="left">
          <h1>Find Your Furry Friend — Help Reunite Lost Pets</h1>
          <p>Post a report or browse recent lost and found pets in your area.</p>
          <div className="buttons">
            <Link to="/add-lost"><button className="btn" style={{background:'#ff7a59', color:'white'}}>Report Lost</button></Link>
            <Link to="/add-found"><button className="btn secondary">Report Found</button></Link>
          </div>
        </div>
        <div style={{width:320}}>
          <img src="https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=8a6c4b0b" style={{width:'100%', borderRadius:10}} alt="pets" />
        </div>
      </section>

      <section className="container">
        <div className="section-title">
          <h3>Recently Reported Lost Pets</h3>
          <Link to="/lost-pets">View All</Link>
        </div>
        <div className="card-grid">
          {lost.length ? lost.map(p=> <PetCard key={p.id} pet={p} type="Lost" />) : <div>No lost pets yet.</div>}
        </div>

        <div className="section-title">
          <h3>Recently Found Pets</h3>
          <Link to="/found-pets">View All</Link>
        </div>
        <div className="card-grid">
          {found.length ? found.map(p=> <PetCard key={p.id} pet={p} type="Found" />) : <div>No found pets yet.</div>}
        </div>

        <h3 style={{marginTop:18}}>Testimonials</h3>
        <div className="testimonials">
          <div className="testimonial">
            <strong>Riya</strong>
            <p className="small">"I found my dog because someone posted here — thank you!"</p>
          </div>
          <div className="testimonial">
            <strong>Harsh</strong>
            <p className="small">"Easy to use and helped me connect with the finder."</p>
          </div>
        </div>

        <h3 style={{marginTop:18}}>About Us</h3>
        <p className="small">We are a community-driven platform dedicated to reuniting lost pets with their families. Post reports, search listings, and help share across social media.</p>
      </section>
    </div>
  );
}
