import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { mentorAPI } from '../../services/api';
import './ManageInterns.css';

const ManageInterns = () => {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchInterns();
  }, []);

  const fetchInterns = async () => {
    try {
      const response = await mentorAPI.getMyInterns();
      setInterns(response.data);
    } catch (err) {
      console.error('Error fetching interns:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredInterns = interns.filter(intern =>
    intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intern.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <Navbar role="mentor" />
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1>Manage Interns</h1>
            <p>View and manage your intern team</p>
          </div>
          <Link to="/mentor/create-intern" className="btn btn-primary">
            + Add Intern
          </Link>
        </div>

        <div className="search-section">
          <input
            type="text"
            placeholder="Search interns by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : filteredInterns.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>No interns found</h3>
            <p>Start by adding your first intern to the team</p>
            <Link to="/mentor/create-intern" className="btn btn-primary">
              Create Intern
            </Link>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Joined Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInterns.map((intern) => (
                  <tr key={intern._id}>
                    <td>
                      <div className="intern-info">
                        <div className="intern-avatar">
                          {intern.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="intern-name">{intern.name}</span>
                      </div>
                    </td>
                    <td>{intern.email}</td>
                    <td>{formatDate(intern.created_at)}</td>
                    <td>
                      <button className="btn-icon" title="View Details">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageInterns;