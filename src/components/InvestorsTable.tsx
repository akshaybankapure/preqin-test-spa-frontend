// InvestorsTable.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:8000/api';

interface Investor {
  firm_id: number;
  firm_name: string;
  firm_type: string;
  date_added: string;
  address: string;
}

const InvestorsTable: React.FC = () => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchInvestors() {
      try {
        const response = await axios.get<Investor[]>(`${API_URL}/investors`);
        setInvestors(response.data);
      } catch (error) {
        console.error('Error fetching investors:', error);
      }
    }

    fetchInvestors();
  }, []);

  const handleRowClick = (investorId: number) => {
    // Navigate to the InvestorPage with the corresponding investorId
    navigate(`/investors/${investorId}`);
  };

  return (
    <div style={{ width: "50%" }}>
      
      <h3>&nbsp; </h3>
      <h3> Investors </h3>
      <table>
        <thead>
          <tr>
            <th>FirmId</th>
            <th>FirmName</th>
            <th>Type</th>
            <th>DateAdded</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {investors.map((investor) => (
            <tr key={investor.firm_id} onClick={() => handleRowClick(investor.firm_id)}>
              <td>{investor.firm_id}</td>
              <td>{investor.firm_name}</td>
              <td>{investor.firm_type}</td>
              <td>{investor.date_added}</td>
              <td>{investor.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvestorsTable;
