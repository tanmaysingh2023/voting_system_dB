import { useState } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage'
// import AuthPage from './pages/AuthPage'
import AuthPage2 from './pages/AuthPage2'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import PartyList from './pages/PartyList'
import AdminDashboard from './pages/AdminDashboard'
import UserSignUp from './pages/UserSignUp';
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';
import Results from './pages/Results';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage2 />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/election/:electionId" element={<PartyList />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user-signup" element={<UserSignUp />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/results/:electionId" element={<Results />} />
        {/* Add any other routes your app needs */}
      </Routes>
    </BrowserRouter>
  );
}

export default App