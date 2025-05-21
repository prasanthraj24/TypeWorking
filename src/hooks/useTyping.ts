import { useState, useEffect, useCallback, useRef } from 'react';
import { TypingStats } from '../types';

interface UseTypingProps {
  text: string;
  onComplete?: (stats: TypingStats) => void;
}

export const useTyping = ({ text, onComplete }: UseTypingProps) => {
  const [input, setInput] = useState<string>('');
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [stats, setStats] = useState<TypingStats>({
    accuracy: 0,
    wpm: 0,
    correctChars: 0,
    incorrectChars: 0,
    totalChars: text.length,
    elapsedTime: 0,
  });

  const intervalRef = useRef<number | null>(null);

  // Start the timer when typing begins
  const startTimer = useCallback(() => {
    if (!startTime) {
      setStartTime(Date.now());
      setIsActive(true);
    }
  }, [startTime]);

  // Stop the timer when typing is complete
  const stopTimer = useCallback(() => {
    if (startTime && !endTime) {
      const now = Date.now();
      setEndTime(now);
      setIsActive(false);
      
      // Calculate final stats
      const elapsedTime = (now - startTime) / 1000; // in seconds
      const correctChars = input.split('').filter((char, index) => char === text[index]).length;
      const incorrectChars = currentPosition - correctChars;
      const accuracy = (correctChars / currentPosition) * 100;
      const wpm = Math.round((correctChars / 5) / (elapsedTime / 60)); // words per minute (1 word = 5 chars)
      
      const finalStats = {
        accuracy,
        wpm,
        correctChars,
        incorrectChars,
        totalChars: text.length,
        elapsedTime,
      };
      
      setStats(finalStats);
      
      // Call the onComplete callback with the final stats
      if (onComplete) {
        onComplete(finalStats);
      }
    }
  }, [startTime, endTime, input, text, currentPosition, onComplete]);

  // Handle typing input
  const handleInput = useCallback((value: string) => {
    if (!isActive && value.length > 0) {
      startTimer();
    }
    
    setInput(value);
    setCurrentPosition(value.length);
    
    // Check if typing is complete
    if (value.length === text.length) {
      stopTimer();
    }
  }, [isActive, text, startTimer, stopTimer]);

  // Update stats in real-time while typing
  useEffect(() => {
    if (isActive && startTime) {
      const calculateStats = () => {
        const elapsedTime = (Date.now() - startTime) / 1000; // in seconds
        const correctChars = input.split('').filter((char, index) => char === text[index]).length;
        const incorrectChars = currentPosition - correctChars;
        const accuracy = currentPosition > 0 ? (correctChars / currentPosition) * 100 : 0;
        const wpm = Math.round((correctChars / 5) / (elapsedTime / 60)); // words per minute
        
        setStats({
          accuracy,
          wpm,
          correctChars,
          incorrectChars,
          totalChars: text.length,
          elapsedTime,
        });
      };
      
      // Update stats every second
      if (intervalRef.current === null) {
        intervalRef.current = window.setInterval(calculateStats, 1000);
      }
      
      return () => {
        if (intervalRef.current !== null) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
  }, [isActive, startTime, input, text, currentPosition]);

  // Reset the typing session
  const reset = useCallback(() => {
    setInput('');
    setCurrentPosition(0);
    setStartTime(null);
    setEndTime(null);
    setIsActive(false);
    setStats({
      accuracy: 0,
      wpm: 0,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: text.length,
      elapsedTime: 0,
    });
    
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [text]);

  return {
    input,
    setInput: handleInput,
    currentPosition,
    isActive,
    stats,
    reset,
    isComplete: endTime !== null,
  };
};