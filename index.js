import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div style={styles.container}>
      
      {/* Row 1: Top Section - 3 Images Side by Side */}
      <div style={styles.row1}>
        <div style={styles.row1Content}>
          <img 
            src="/images/Hurricane.jpg" 
            alt="Left Image" 
            style={styles.topImage} 
          />
          <img 
            src="/images/photo.jpg"
            alt="Middle Image" 
            style={styles.topImage} 
          />
          <img 
            src="/images/overflowing.webp"
            alt="Right Image" 
            style={styles.topImage} 
          />
        </div>
      </div>

      {/* Row 2: Main Content Section (Centered) */}
      <div style={styles.row2}>
        <div style={styles.row2Content}>
          
          {/* Left Text Content */}
          <div style={styles.leftTextContainer}>
            <h2 style={styles.animatedText}>CivicShield AI – Transforming Urban Complaints into Intelligent Action</h2>
            <p style={styles.animatedText}>Building Safer Cities Through Data-Driven Intelligence</p>
          </div>

          {/* Center - Upload Feature */}
          <div style={styles.uploadSection}>
            <Link to="/upload" style={styles.uploadCard}>
              <div style={styles.uploadIcon}>📤</div>
              <div style={styles.uploadText}>Upload Image</div>
            </Link>
          </div>

          {/* Right Text Content */}
          <div style={styles.rightTextContainer}>
            <h2 style={styles.animatedText}>Smarter Cities Begin with Smarter Monitoring</h2>
            <p style={styles.animatedText}>Urban Negligence Today Becomes Environmental Damage Tomorrow</p>
          </div>

        </div>
      </div>

      {/* Row 3: Features, Upload Image, and Right Side Photo */}
      <div style={styles.row3}>
        <div style={styles.row3Content}>
          
          {/* Left Side - Blue Sidebar */}
          <div style={styles.sidebar}>
            <div style={styles.sidebarItem}>
              <Link to="/info" style={styles.sidebarLink}>
                <span style={styles.sidebarIcon}>ℹ️</span>
                <span>Info</span>
              </Link>
            </div>
            <div style={styles.sidebarItem}>
              <Link to="/comment" style={styles.sidebarLink}>
                <span style={styles.sidebarIcon}>💬</span>
                <span>Comment Section</span>
              </Link>
            </div>
            <div style={styles.sidebarItem}>
              <Link to="/ngo" style={styles.sidebarLink}>
                <span style={styles.sidebarIcon}>🤝</span>
                <span>NGO/CSR Response</span>
              </Link>
            </div>
            <div style={styles.sidebarItem}>
              <Link to="/verification" style={styles.sidebarLink}>
                <span style={styles.sidebarIcon}>✅</span>
                <span>Verification</span>
              </Link>
            </div>
          </div>
          {/* Right Side - Another Image */}
          <div style={styles.rightImage}>
            <img 
              src="/images/Gutters.jpg.webp"
              alt="Right Feature Image" 
              style={styles.rightImageStyle} 
            />
          </div>

        </div>
      </div>

    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#b3cae2',
    padding: '20px',
  },
  row1: {
    marginBottom: '30px',
  },
  row1Content: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
  },
  row2: {
    marginBottom: '30px',
  },
  row2Content: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '30px',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
  row3: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
  row3Content: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '30px',
    alignItems: 'center',
  },
  topImage: {
    width: '30%',
    height: '250px',
    objectFit: 'cover',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
  sidebar: {
    width: '1000px',
    backgroundColor: '#0056b3',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
  sidebarItem: {
    marginBottom: '15px',
  },
  sidebarLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: 'white',
    textDecoration: 'none',
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    transition: 'all 0.3s ease',
  },
  sidebarIcon: {
    fontSize: '40px',
  },
  leftTextContainer: {
    flex: 1,
    maxWidth: '500px',
    textAlign: 'left',
  },
  rightTextContainer: {
    flex: 1,
    maxWidth: '500px',
    textAlign: 'right',
  },
  animatedText: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: '15px',
    animation: 'fadeInUp 2s ease-in-out infinite',
  },
  uploadSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadCard: {
    width: '250px',
    height: '250px',
    backgroundColor: 'green',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  },
  uploadIcon: {
    fontSize: '100px',
    marginBottom: '10px',
  },
  uploadText: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
  },
  rightImage: {
    width: '350px',
  },
  rightImageStyle: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
};

export default Dashboard;
