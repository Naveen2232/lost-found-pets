import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddLost from './pages/AddLost';
import AddFound from './pages/AddFound';
import LostList from './pages/LostList';
import FoundList from './pages/FoundList';

function App(){
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-lost" element={<AddLost />} />
          <Route path="/add-found" element={<AddFound />} />
          <Route path="/lost-pets" element={<LostList />} />
          <Route path="/found-pets" element={<FoundList />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
