import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import VerifyPage from './pages/VerifyPage';
import BadgePage from './pages/BadgePage';
import ProfilePage from './pages/ProfilePage';
import AllBadgesPage from './pages/AllBadgesPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/badge/:username/:badgeId" element={<BadgePage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/badges" element={<AllBadgesPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
