import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Info = () => {
  const [resolvedIssues, setResolvedIssues] = useState(0);
  const [verifications, setVerifications] = useState([]);
  const [upvotes, setUpvotes] = useState(1250);
  const [progress, setProgress] = useState(78);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVerifications();
  }, []);

  const fetchVerifications = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5055/api/verifications');
      const data = await response.json();
      
      if (data.success) {
        setResolvedIssues(data.resolvedIssuesCount);
        setVerifications(data.verifications);
      }
    } catch (error) {
      console.error('Error fetching verifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTeamIcon = (team) => {
    const teamIcons = {
      'The Ugly Indian Team': '🗑️',
      'Cleanliness Awareness Team': '💧',
      'Safe Life Team': '🛣️',
      'Power Safety Team': '⚡',
      'Green Environment Team': '🌳',
      'Civic Shield Team': '🛡️'
    };
    return teamIcons[team] || '📋';
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🛡️ About CivicShield AI</h1>
        
        {/* Description */}
        <div style={styles.descriptionBox}>
          <p style={styles.descriptionText}>
            CivicShield AI is an intelligent platform that detects and reports public hazards using AI and connects NGOs and CSR teams to resolve them quickly for safer and cleaner cities.
          </p>
        </div>

        {/* Metrics Section */}
        <div style={styles.metricsSection}>
          <div style={styles.metricCard}>
            <div style={styles.metricIcon}>👍</div>
            <h3 style={styles.metricTitle}>Upvotes</h3>
            <p style={styles.metricValue}>{upvotes.toLocaleString()}</p>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricIcon}>📊</div>
            <h3 style={styles.metricTitle}>Progress</h3>
            <p style={styles.metricValue}>{progress}%</p>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${progress}%` }}></div>
            </div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricIcon}>✅</div>
            <h3 style={styles.metricTitle}>Resolved Issues</h3>
            <p style={styles.metricValue}>{resolvedIssues.toLocaleString()}</p>
            <p style={styles.metricSubtext}>Issues successfully resolved</p>
          </div>
        </div>

        {/* Verification Proofs Section */}
        <div style={styles.proofsSection}>
          <h2 style={styles.proofsTitle}>📄 Verification Proofs</h2>
          <p style={styles.proofsDescription}>
            All resolved issues with verification reports
          </p>

          {loading ? (
            <div style={styles.loadingContainer}>
              <p>Loading verification proofs...</p>
            </div>
          ) : verifications.length === 0 ? (
            <div style={styles.emptyContainer}>
              <p>📭 No verification proofs available yet</p>
            </div>
          ) : (
            <div style={styles.proofsContainer}>
              {verifications.map((verification, index) => (
                <div key={verification._id} style={styles.proofCard}>
                  <div style={styles.proofHeader}>
                    <span style={styles.proofIndex}>#{index + 1}</span>
                    <span style={styles.proofTeam}>{getTeamIcon(verification.assignedTeam)} {verification.assignedTeam}</span>
                  </div>
                  
                  <div style={styles.proofDetails}>
                    <div style={styles.proofDetailRow}>
                      <strong>Category:</strong> {verification.category?.toUpperCase().replace('_', ' ') || 'N/A'}
                    </div>
                    <div style={styles.proofDetailRow}>
                      <strong>Area:</strong> {verification.area || 'N/A'}
                    </div>
                    <div style={styles.proofDetailRow}>
                      <strong>Issue Date:</strong> {verification.issueDate || 'N/A'}
                    </div>
                    <div style={styles.proofDetailRow}>
                      <strong>Resolved Date:</strong> {verification.resolvedDate || 'N/A'}
                    </div>
                    <div style={styles.proofDetailRow}>
                      <strong>Risk Level:</strong> {verification.riskLevel?.toUpperCase() || 'N/A'}
                    </div>
                  </div>

                  <div style={styles.proofImages}>
                    {verification.beforeImage && (
                      <div style={styles.proofImage}>
                        <p style={styles.proofImageLabel}>Before</p>
                        <img 
                          src={`http://localhost:5048${verification.beforeImage}`} 
                          alt="Before" 
                          style={styles.proofImagePreview} 
                        />
                      </div>
                    )}
                    {verification.reportImage && (
                      <div style={styles.proofImage}>
                        <p style={styles.proofImageLabel}>Report</p>
                        <img 
                          src={`http://localhost:5048${verification.reportImage}`} 
                          alt="Report" 
                          style={styles.proofImagePreview} 
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Back to Dashboard */}
        <Link to="/dashboard" style={styles.backLink}>
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#7cbbfb',
    padding: '20px',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '1000px',
    width: '100%',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: '30px',
  },
  descriptionBox: {
    backgroundColor: '#e3f2fd',
    padding: '25px',
    borderRadius: '12px',
    marginBottom: '40px',
    border: '2px solid #2196f3',
  },
  descriptionText: {
    fontSize: '18px',
    color: '#333',
    lineHeight: '1.8',
    textAlign: 'left',
  },
  metricsSection: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '40px',
    flexWrap: 'wrap',
  },
  metricCard: {
    flex: 1,
    minWidth: '200px',
    backgroundColor: '#f8f9fa',
    padding: '25px',
    borderRadius: '12px',
    border: '2px solid #0056b3',
  },
  metricIcon: {
    fontSize: '40px',
    marginBottom: '10px',
  },
  metricTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: '10px',
  },
  metricValue: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5px',
  },
  metricSubtext: {
    fontSize: '14px',
    color: '#666',
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    marginTop: '10px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
    transition: 'width 0.3s ease',
  },
  proofsSection: {
    backgroundColor: '#fff3cd',
    padding: '30px',
    borderRadius: '12px',
    marginBottom: '30px',
    border: '2px solid #ffc107',
  },
  proofsTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: '10px',
  },
  proofsDescription: {
    fontSize: '16px',
    color: '#856404',
    marginBottom: '20px',
  },
  loadingContainer: {
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '8px',
  },
  emptyContainer: {
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '8px',
    color: '#666',
  },
  proofsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  proofCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    textAlign: 'left',
  },
  proofHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    paddingBottom: '10px',
    borderBottom: '2px solid #ffc107',
  },
  proofIndex: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#0056b3',
  },
  proofTeam: {
    fontSize: '16px',
    color: '#333',
  },
  proofDetails: {
    marginBottom: '15px',
  },
  proofDetailRow: {
    fontSize: '14px',
    color: '#333',
    marginBottom: '5px',
  },
  proofImages: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    marginTop: '15px',
  },
  proofImage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  proofImageLabel: {
    fontSize: '12px',
    color: '#666',
    marginBottom: '5px',
  },
  proofImagePreview: {
    maxWidth: '150px',
    maxHeight: '150px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    objectFit: 'contain',
  },
  backLink: {
    display: 'inline-block',
    marginTop: '20px',
    color: '#0056b3',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

export default Info;