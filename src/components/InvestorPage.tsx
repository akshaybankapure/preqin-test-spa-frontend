// InvestorPage.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:8000/api';

interface Commitment {
  id: number;
  asset_class: string;
  firm_id: number;
  currency: string;
  amount: number;
}

const InvestorPage: React.FC = () => {
  const [firmName, setFirmName] = useState<string>('');
  const [assetClass, setAssetClass] = useState<string>('');
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const { investorId } = useParams<{ investorId: string }>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchFirmDetails = async () => {
      try {
        if (!investorId) return; 
        const response = await axios.get(`${API_URL}/investors`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const firm = response.data.find((firm: any) => firm.firm_id === parseInt(investorId));
        if (firm) {
          setFirmName(firm.firm_name);
        }
      } catch (error) {
        console.error('Error fetching firm details:', error);
      }
    };

    if (investorId) {
      fetchFirmDetails();
    }
  }, [investorId]);

  useEffect(() => {
    setLoading(true);
    const fetchCommitments = async () => {
      try {
        const response = await axios.get<Commitment[]>(`${API_URL}/investor/commitment/${assetClass}/${investorId}`);
        setCommitments(response.data);
      } catch (error) {
        console.error('Error fetching commitment information:', error);
        setLoading(false);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    if (assetClass && investorId) {
      fetchCommitments();
    } else {
      setCommitments([]);
    }
  }, [assetClass, investorId]);

  const handleAssetClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAssetClass = event.target.value.toLowerCase();
    setAssetClass(selectedAssetClass);
  };

  return (
    
    <div style={{ width: "50%" }}>
    <Link to="/"><button>Back to Investors Table</button></Link>
      <h3>Investor Details</h3>
      <h3>Firm Name: &nbsp; {firmName}</h3>
      <div className="select-container"> {/* Apply the 'select-container' class */}
        <label htmlFor="assetClass">Select Asset Class: &nbsp; </label>
        <select id="assetClass" value={assetClass} onChange={handleAssetClassChange}>
        <option value="">Select Asset Class</option>
        <option value="pe">PE (Private Equity)</option>
        <option value="pd">PD (Private Debt)</option>
        <option value="re">RE (Real Estate)</option>
        <option value="inf">INF (Infrastructure)</option>
        <option value="nr">NR (Natural Resources)</option>
        <option value="hf">HF (Hedge Funds)</option>
      </select>
      </div>
      {loading && assetClass && (
        <p>Loading...</p>
      )}
      {!loading && assetClass && (
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Asset Class</th>
            <th>Firm ID</th>
            <th>Currency</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {commitments.map(commitment => (
            <tr key={commitment.id}>
              <td>{commitment.asset_class}</td>
              <td>{commitment.firm_id}</td>
              <td>{commitment.currency}</td>
              <td>{commitment.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
       )}
    </div>
  );
};

export default InvestorPage;
