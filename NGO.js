

import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';


const NGO = () => {
const location = useLocation();
const { category, riskLevel, description, confidence } = location.state || {};
const [submitted, setSubmitted] = useState(false);


// Category-based NGO team mapping
const getNGOMessage = (category) => {
switch (category) {
case 'garbage':
return {
message: '🗑️ Garbage problem is informed to The Ugly Indian Team',
team: 'The Ugly Indian Team',
icon: '🗑️'
};
case 'drainage':
return {
message: '💧 Drainage problem is informed to Cleanliness Awareness Team',
team: 'Cleanliness Awareness Team',
icon: '💧'
};
case 'road_damage':
return {
message: '🛣️ Road problem is informed to Safe Life Team',
team: 'Save Life Team',
icon: '🛣️'
};
case 'broken_electric_pole':
return {
message: '⚡ Electric pole problem is informed to Power Safety Team',
team: 'Power Safety Team',
icon: '⚡'
};
case 'fallen_tree':
return {
message: '🌳 Fallen tree problem is informed to Green Environment Team',
team: 'Green Environment Team',
icon: '🌳'
};
default:
return {
message: '⚠️ Problem is informed to Civic Shield Team',
team: 'Civic Shield Team',
icon: '⚠️'
};
}
};


const ngomessage = getNGOMessage(category);


const handleSubmit = () => {
setSubmitted(true);
// You can add API call here to save the report
console.log('Report submitted to:', ngomessage.team);
};


return (
<div style={styles.container}>
<div style={styles.card}>
<h1 style={styles.title}>📬 Report Submitted to NGO</h1>


    {submitted ? (
      <div style={styles.successBox}>
        <div style={styles.successIcon}>✅</div>
        <h2 style={styles.successTitle}>Report Successfully Submitted!</h2>
        <p style={styles.successMessage}>
          {ngomessage.message}
        </p>
      </div>
    ) : (
      <div style={styles.reviewBox}>
        <h2 style={styles.reviewTitle}>📋 Report Review</h2>
        
        <div style={styles.infoSection}>
          <div style={styles.infoItem}>
            <strong>Category:</strong> {category ? category.toUpperCase().replace('_', ' ') : 'N/A'}
          </div>
          <div style={styles.infoItem}>
            <strong>Risk Level:</strong> {riskLevel ? riskLevel.toUpperCase() : 'N/A'}
          </div>
          <div style={styles.infoItem}>
            <strong>Confidence:</strong> {confidence || 'N/A'}
          </div>
          <div style={styles.infoItem}>
            <strong>Description:</strong> {description || 'N/A'}
          </div>
        </div>

        <div style={styles.ngoSection}>
          <div style={styles.ngoIcon}>{ngomessage.icon}</div>
          <h3 style={styles.ngoTitle}>NGO Team Assigned</h3>
          <p style={styles.ngoMessage}>{ngomessage.message}</p>
        </div>

        <button 
          style={styles.submitButton}
          onClick={handleSubmit}
        >
          📬 Confirm & Submit Report
        </button>
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
maxWidth: '600px',
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
},
reviewBox: {
backgroundColor: '#f8f9fa',
padding: '30px',
borderRadius: '12px',
border: '2px solid #0056b3',
},
reviewTitle: {
fontSize: '24px',
fontWeight: 'bold',
color: '#0056b3',
marginBottom: '20px',
},
infoSection: {
backgroundColor: 'white',
padding: '20px',
borderRadius: '8px',
marginBottom: '20px',
textAlign: 'left',
},
infoItem: {
fontSize: '16px',
color: '#333',
marginBottom: '10px',
padding: '8px',
backgroundColor: '#f0f0f0',
borderRadius: '4px',
},
ngoSection: {
backgroundColor: '#e3f2fd',
padding: '25px',
borderRadius: '12px',
marginBottom: '20px',
border: '2px solid #2196f3',
},
ngoIcon: {
fontSize: '50px',
marginBottom: '15px',
},
ngoTitle: {
fontSize: '22px',
fontWeight: 'bold',
color: '#0056b3',
marginBottom: '10px',
},
ngoMessage: {
fontSize: '18px',
color: '#333',
lineHeight: '1.6',
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
};
export default NGO;