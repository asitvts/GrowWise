import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import Dashboard from './Dashboard.jsx';
import AddMoreStocks from './AddMoreStocks.jsx';
import Compare from './Compare.jsx'
import Estimate from './Estimate.jsx'
import FolioAnalysis from './FolioAnalysis.jsx'
import LandingPage from './LandingPage.jsx';
import OrderHistory from './OrderHistory.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/Login" element={<LoginPage />}></Route>
        <Route path="/SignUp" element={<SignUpPage />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
        <Route path="/AddMoreStocks" element={<AddMoreStocks />}></Route>
        <Route path="/Compare" element={<Compare />}></Route>
        <Route path="/Estimate" element={<Estimate />}></Route>
        <Route path="/PortfolioAnalysis" element={<FolioAnalysis />}></Route>
        <Route path="/OrderHistory" element={<OrderHistory />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
