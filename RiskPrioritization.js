import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const RiskPrioritization = () => {
  const [description, setDescription] = useState('');
  const [riskData, setRiskData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Risk keywords and their weights
  const riskKeywords = {
    high: {
      keywords: ['school', 'hospital', 'children', 'elderly', 'pregnant', 'infant', 'emergency', 'life-threatening'],
      weight: 3
    },
    moderate: {
      keywords: ['traffic', 'road', 'intersection', 'crowd', 'market', 'public', 'residential'],
      weight: 2
    },
    low: {
      keywords: ['environment', 'pollution', 'waste', 'drainage', 'minor', 'isolated', 'remote'],
      weight: 1
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }

    setLoading(true);
    setError(null);
    setRiskData(null);

    try {
      const response = await fetch('http://localhost:5047/api/analyze-risk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();
      console.log('Risk Analysis Result:', data);

      if (data.success) {
        setRiskData(data);
      } else {
        setError(data.message || 'Analysis failed');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Server error. Please try again.');
    }

    setLoading(false);
  };

  const chartData = {
    labels: ['High Risk', 'Moderate Risk', 'Low Risk'],
    datasets: [
      {
        data: riskData ? [riskData.riskScores.high, riskData.riskScores.moderate, riskData.riskScores.low] : [0, 0, 0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Risk Distribution',
        font: {
          size: 18
        }
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🚨 Risk Prioritization</h1>
        
        <form onSubmit={handleAnalyze} style={styles.form}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter hazard description (e.g., 'Hazard is near school and hospital')"
            style={styles.textarea}
            rows={5}
          />
          
          <button 
            type="submit" 
            style={styles.button} 
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Analyze Risk'}
          </button>
        </form>

        {error && (
          <div style={styles.errorBox}>
            <p>❌ {error}</p>
          </div>
        )}

        {riskData && (
          <div style={styles.resultSection}>
            <div style={styles.resultBox}>
              <h2 style={styles.resultTitle}>✅ Risk Analysis Result</h2>
              <p style={styles.resultType}>
                <strong>Overall Risk Level:</strong> {riskData.overallRisk.toUpperCase()}
              </p>
              <p style={styles.resultConfidence}>
                <strong>Confidence:</strong> {riskData.confidence.toFixed(2)}%
              </p>
              <p style={styles.resultConfidence}>
                <strong>Keywords Found:</strong> {riskData.keywordsFound.join(', ')}
              </p>
            </div>

            <div style={styles.chartSection}>
              <Pie data={chartData} options={chartOptions} />
            </div>

            <div style={styles.recommendationBox}>
              <h3 style={styles.recommendationTitle}>📋 Recommendations:</h3>
              <ul style={styles.recommendationList}>
                {riskData.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <Link to="/upload" style={styles.backLink}>
          ← Back to Upload
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
    backgroundColor: '#f4f7fa',
    padding: '20px',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '800px',
    width: '100%',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '30px',
  },
  textarea: {
    padding: '15px',
    border: '2px solid #0056b3',
    borderRadius: '6px',
    fontSize: '16px',
    resize: 'vertical',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#0056b3',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
  resultSection: {
    marginTop: '30px',
  },
  resultBox: {
    backgroundColor: '#e3f2fd',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  resultTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: '15px',
  },
  resultType: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  resultConfidence: {
    fontSize: '18px',
    color: '#666',
  },
  chartSection: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
  },
  recommendationBox: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#fff3cd',
    borderRadius: '8px',
    textAlign: 'left',
  },
  recommendationTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: '10px',
  },
  recommendationList: {
    paddingLeft: '20px',
    color: '#856404',
  },
  errorBox: {
    backgroundColor: '#ffebee',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '20px',
    color: '#c62828',
    border: '1px solid #c62828',
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

export default RiskPrioritization;