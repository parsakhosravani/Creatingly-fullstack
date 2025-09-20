import { useState, useCallback } from 'react';

export const useCounter = (initialValue: number = 0) => {
  const [count, setCount] = useState<number>(initialValue);

  const increment = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(prevCount => Math.max(0, prevCount - 1)); // Never go below zero
  }, []);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  const setValue = useCallback((value: number) => {
    setCount(Math.max(0, value)); // Ensure value is never negative
  }, []);

  return {
    count,
    increment,
    decrement,
    reset,
    setValue
  };
};