import { useCallback, useEffect, useRef } from 'react';
export function useDebounceCallback(_ref) {
  let {
    callback,
    delay = 250
  } = _ref;
  const timeoutRef = useRef(null);
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  const debouncedCallback = useCallback(args => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callbackRef.current(args);
    }, delay);
  }, [delay]);
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return debouncedCallback;
}
//# sourceMappingURL=useDebounceCallback.js.map