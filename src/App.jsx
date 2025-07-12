import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClubsWebsite from './pages/ClubsWebsite';
import LoginPage from './components/auth/login_page';
import ComparePage from './pages/ComparePage';
import EventsPage from './pages/EventsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ClubsWebsite />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/compare" element={<ComparePage />} />
      <Route path="/events" element={<EventsPage />} />
    </Routes>
  );
}
