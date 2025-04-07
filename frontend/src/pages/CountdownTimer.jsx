import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ endTimeString, onElectionEnd }) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isEnded: false
  });

  useEffect(() => {
    // Convert end time string to Date object
    const endTime = new Date(endTimeString);
    
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = endTime - now;
      
      if (difference <= 0) {
        // Election has ended
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isEnded: true
        });
        
        if (onElectionEnd) {
          onElectionEnd();
        }
        
        return;
      }
      
      // Calculate remaining time
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeRemaining({
        days,
        hours,
        minutes,
        seconds,
        isEnded: false
      });
    };
    
    // Calculate immediately and then set up interval
    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [endTimeString, onElectionEnd]);
  
  return (
    <div className="text-white">
      <span className={`text-gray-400 mr-2 ${timeRemaining.isEnded && 'hidden'}`}>Ends in:</span>
      {timeRemaining.isEnded ? (
        <span className="font-semibold text-red-400">Election Ended</span>
      ) : (
        <span className="font-mono">
          {timeRemaining.days}d : {String(timeRemaining.hours).padStart(2, '0')}h : {String(timeRemaining.minutes).padStart(2, '0')}m : {String(timeRemaining.seconds).padStart(2, '0')}s
        </span>
      )}
    </div>
  );
};

export default CountdownTimer;