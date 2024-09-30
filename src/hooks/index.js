import { useCallback, useEffect, useRef } from 'react';

const useDebouncedCallback = (callback, delay) => {
  const timerRef = useRef();

  const debouncedCallback = useCallback(
    (...args) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return debouncedCallback;
};

export default useDebouncedCallback;
