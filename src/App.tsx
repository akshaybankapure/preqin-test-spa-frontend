// App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvestorsTable from './components/InvestorsTable';
import InvestorPage from './components/InvestorPage';

const App: React.FC = () => {
  return (
    <Router>
    <h3>Preqin Test App</h3>
    <div className="container">
    
      <Routes>
        <Route path="/" element={<InvestorsTable />} />
        <Route path="/investors/:investorId" element={<InvestorPage />} />
      </Routes>
    </div>
  </Router>
  );
};

export default App;
