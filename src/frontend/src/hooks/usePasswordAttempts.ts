import { useState, useEffect } from 'react';

const MAX_ATTEMPTS = 3;
const LOCKOUT_DURATION = 5 * 60; // 5 minutes in seconds
const STORAGE_KEY = 'password_attempts';
const LOCKOUT_KEY = 'lockout_until';

interface StoredData {
  attempts: number;
  lockoutUntil: number | null;
}

export function usePasswordAttempts() {
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  // Load stored data on mount
  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      try {
        const data: StoredData = JSON.parse(storedData);
        setAttempts(data.attempts);
        
        if (data.lockoutUntil) {
          const now = Date.now();
          if (now < data.lockoutUntil) {
            setIsLocked(true);
            setRemainingTime(Math.ceil((data.lockoutUntil - now) / 1000));
          } else {
            // Lockout expired, reset
            reset();
          }
        }
      } catch (e) {
        // Invalid data, reset
        reset();
      }
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!isLocked || remainingTime <= 0) return;

    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          setIsLocked(false);
          reset();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLocked, remainingTime]);

  const incrementAttempts = () => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (newAttempts >= MAX_ATTEMPTS) {
      const lockoutUntil = Date.now() + LOCKOUT_DURATION * 1000;
      const data: StoredData = {
        attempts: newAttempts,
        lockoutUntil,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setIsLocked(true);
      setRemainingTime(LOCKOUT_DURATION);
    } else {
      const data: StoredData = {
        attempts: newAttempts,
        lockoutUntil: null,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  };

  const reset = () => {
    setAttempts(0);
    setIsLocked(false);
    setRemainingTime(0);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    attempts,
    isLocked,
    remainingTime,
    incrementAttempts,
    reset,
  };
}
