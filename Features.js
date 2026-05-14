import React from 'react';

const featuresData = [
  "🤖 AI Risk Analysis",
  "📊 Priority Dashboard",
  "📸 Before & After Verification",
  "💬 Citizen Reaction Signals",
  "🔒 Anonymous Reporting System"
];

const Features = () => {
  return (
    <div className="features-grid">
      {featuresData.map((feature, index) => (
        <div key={index} className="feature-item">
          {feature}
        </div>
      ))}
    </div>
  );
};

export default Features;