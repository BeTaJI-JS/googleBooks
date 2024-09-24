import { useCallback, useRef } from 'react';

const useDebouncedCallback = (callback, wait) => {
  const timeout = useRef();

  return useCallback(
    (...args) => {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        callback(...args);
      }, wait);
    },
    [callback, wait],
  );
};

export default useDebouncedCallback;
