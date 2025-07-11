import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import OnboardingWizard from './components/OnboardingWizard';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ApiKeyLogin from './components/ApiKeyLogin';
import './App.css';

function App() {
  const apiKey = localStorage.getItem('apiKey');
  if (!apiKey) {
    return <ApiKeyLogin />;
  }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboard" element={<OnboardingWizard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
