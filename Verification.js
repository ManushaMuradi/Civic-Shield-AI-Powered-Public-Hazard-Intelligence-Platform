import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Verification = () => {
  const location = useLocation();
  const { category, riskLevel, description, confidence, assignedTeam } = location.state || {};
  
  const [beforeImage, setBeforeImage] = useState(null);
  const [reportImage, setReportImage] = useState(null);
  const [issueDate, setIssueDate] = useState('');
  const [resolvedDate, setResolvedDate] = useState('');
  const [area, setArea] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resolvedIssuesCount, setResolvedIssuesCount] = useState(0);
  const [error, setError] = useState('');

  const handleBeforeImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBeforeImage(file);
    }
  };

  const handleReportImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReportImage(file);
    }
  };

  const handleSubmit = async () => {
    setError('');
    
    if (!beforeImage || !reportImage || !issueDate || !resolvedDate || !area) {
      alert('Please fill all fields and upload all images!');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('category', category || 'unknown');
    formData.append('riskLevel', riskLevel || 'unknown');
    formData.append('description', description || '');
    formData.append('confidence', confidence || 0);
    formData.append('assignedTeam', assignedTeam || 'Civic Shield Team');
    formData.append('issueDate', issueDate);
    formData.append('resolvedDate', resolvedDate);
    formData.append('area', area);
    formData.append('beforeImage', beforeImage);
    formData.append('reportImage', reportImage);

    try {
      console.log('Submitting verification...');
      const response = await fetch('http://localhost:5055/api/submit-verification', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Response:', data);

      if (data.success) {
        setResolvedIssuesCount(data.resolvedIssuesCount);
        setSubmitted(true);
      } else {
        setError(data.message || 'Verification failed');
        alert(data.message || 'Verification failed');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Server error. Please try again.');
      alert('Server error. Please check if backend is running on port 5048');
    }

    setLoading(false);
  };

  const getTeamName = (team) => {
    const teamMap = {
      'The Ugly Indian Team': 'The Ugly Indian Team',
      'Cleanliness Awareness Team': 'Cleanliness Awareness Team',
      'Safe Life Team': 'Safe Life Team',
      'Power Safety Team': 'Power Safety Team',
      'Green Environment Team': 'Green Environment Team',
      'Civic Shield Team': 'Civic Shield Team'
    };
    return teamMap[team] || 'Civic Shield Team';
  };

  const teamName = assignedTeam ? getTeamName(assignedTeam) : 'Civic Shield Team';

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🔍 Verification & Report</h1>
        
        {error && (
          <div style={styles.errorBox}>
            <p>❌ {error}</p>
          </div>
        )}
        
        {submitted ? (
          <div style={styles.successBox}>
            <div style={styles.successIcon}>✅</div>
            <h2 style={styles.successTitle}>Verification Submitted Successfully!</h2>
            <p style={styles.successMessage}>
              The report has been verified and submitted to the system.
            </p>
            <p style={styles.successMessage}>
              <strong>Resolved Issues Count:</strong> {resolvedIssuesCount.toLocaleString()}
            </p>
            <Link to="/info" style={styles.viewInfoButton}>
              📊 View Info Page
            </Link>
          </div>
        ) : (
          <div style={styles.verificationSection}>
            {/* Two Column Layout (Before & Report) */}
            <div style={styles.columnsContainer}>
              {/* Column 1: Before Image */}
              <div style={styles.column}>
                <h3 style={styles.columnTitle}>📸 Before</h3>
                <div style={styles.imageUpload}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBeforeImageChange}
                    style={styles.fileInput}
                  />
                  {beforeImage ? (
                    <img 
                      src={URL.createObjectURL(beforeImage)} 
                      alt="Before" 
                      style={styles.previewImage} 
                    />
                  ) : (
                    <div style={styles.placeholder}>Upload Before Image</div>
                  )}
                </div>
              </div>

              {/* Column 2: Report by NGO Team */}
              <div style={styles.column}>
                <h3 style={styles.columnTitle}>📄 Report by NGO Team</h3>
                <div style={styles.imageUpload}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleReportImageChange}
                    style={styles.fileInput}
                  />
                  {reportImage ? (
                    <img 
                      src={URL.createObjectURL(reportImage)} 
                      alt="Report" 
                      style={styles.previewImage} 
                    />
                  ) : (
                    <div style={styles.placeholder}>Upload Report Image</div>
                  )}
                </div>
              </div>
            </div>

            {/* Report Details */}
            <div style={styles.reportDetails}>
              <h2 style={styles.reportTitle}>📋 Report Details</h2>
              
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Issue Date:</label>
                  <input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Area:</label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g., Nagole"
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Resolved Date:</label>
                  <input
                    type="date"
                    value={resolvedDate}
                    onChange={(e) => setResolvedDate(e.target.value)}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Solved By Team:</label>
                  <input
                    type="text"
                    value={teamName}
                    disabled
                    style={{ ...styles.input, backgroundColor: '#f0f0f0' }}
                  />
                </div>
              </div>

              {/* Standard Message */}
              <div style={styles.standardMessage}>
                <p style={styles.messageText}>
                  After receiving the hazard alert through CivicShield AI, our team conducted a field inspection and confirmed the issue. Necessary corrective measures were taken to resolve the problem. The affected area has been restored to safe conditions, ensuring better public safety and environmental hygiene for the community.
                </p>
              </div>

              <p style={styles.thankYou}>Thank you</p>

              <button 
                style={styles.submitButton} 
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? '📬 Submitting...' : '📬 Submit Verification'}
              </button>
            </div>
          </div>
        )}

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
    maxWidth: '1200px',
    width: '100%',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: '30px',
  },
  successBox: {
    backgroundColor: '#e8f5e9',
    padding: '40px',
    borderRadius: '12px',
    border: '2px solid #4caf50',
  },
  successIcon: {
    fontSize: '60px',
    marginBottom: '20px',
  },
  successTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: '15px',
  },
  successMessage: {
    fontSize: '20px',
    color: '#333',
    lineHeight: '1.6',
    marginBottom: '10px',
  },
  viewInfoButton: {
    display: 'inline-block',
    marginTop: '20px',
    padding: '12px 30px',
    backgroundColor: '#2196f3',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)',
    transition: 'all 0.3s ease',
  },
  verificationSection: {
    backgroundColor: '#f8f9fa',
    padding: '30px',
    borderRadius: '12px',
    border: '2px solid #0056b3',
  },
  columnsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '30px',
    marginBottom: '40px',
    flexWrap: 'wrap',
  },
  column: {
    flex: 1,
    minWidth: '300px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  columnTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: '15px',
  },
  imageUpload: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  fileInput: {
    padding: '10px',
    border: '2px dashed #0056b3',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%',
  },
  previewImage: {
    maxWidth: '100%',
    maxHeight: '300px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    objectFit: 'contain',
  },
  placeholder: {
    width: '100%',
    height: '200px',
    backgroundColor: '#f0f0f0',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#999',
    fontSize: '16px',
  },
  reportDetails: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  reportTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: '20px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginBottom: '30px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '8px',
  },
  input: {
    padding: '12px',
    border: '2px solid #0056b3',
    borderRadius: '6px',
    fontSize: '16px',
    width: '100%',
  },
  standardMessage: {
    backgroundColor: '#e3f2fd',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    border: '1px solid #2196f3',
  },
  messageText: {
    fontSize: '16px',
    color: '#333',
    lineHeight: '1.8',
    textAlign: 'left',
  },
  thankYou: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: '20px',
  },
  submitButton: {
    padding: '15px 40px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 'bold',
    boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
    transition: 'all 0.3s ease',
  },
  backLink: {
    display: 'inline-block',
    marginTop: '20px',
    color: '#0056b3',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  errorBox: {
    backgroundColor: '#ffebee',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    color: '#c62828',
    border: '1px solid #c62828',
  },
};

export default Verification;