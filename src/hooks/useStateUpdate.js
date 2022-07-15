/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from 'react'

export function useStateUpdate(handler, deps) {
    const firstRenderRef = useRef(true);
  
    useEffect(() => {
      if (firstRenderRef.current) {
        firstRenderRef.current = false;
        return;
      }
  
      return handler();
    }, deps);
}

export default useStateUpdate