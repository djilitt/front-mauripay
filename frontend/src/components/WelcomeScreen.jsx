import React, { useState, useEffect } from 'react';

const WelcomeScreen = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  // Check if the user has visited the application before
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (hasVisitedBefore) {
      setIsFirstVisit(false);
    }
  }, []);

  const handleGetStarted = () => {
    // Update the state to indicate that the user has seen the Welcome Screen
    setIsFirstVisit(false);
    // Store the user's preference in local storage
    localStorage.setItem('hasVisitedBefore', true);
  };

  return (
    // JSX code for the Welcome Screen
    <div>
      {isFirstVisit && (
        <div>
          <h1>Welcome to Our App</h1>
          <p>Get started to explore our amazing features!</p>
          <button onClick={handleGetStarted}>Get Started</button>
        </div>
      )}
      {/* Your other application content goes here */}
    </div>
  );
};

export default WelcomeScreen;