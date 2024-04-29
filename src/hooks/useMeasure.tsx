import {
  DependencyList,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

/**
 * Measures the DOM element of the given type and updates the measure on the given dependency array.
 * @param callback The callback function which transmits the measured DOM element
 * @param deps The dependency array which should trigger the measure to be called again
 * @returns DOMRect
 */
export const useMeasure = <T extends HTMLElement>(
  callback?: (rect: DOMRectReadOnly) => void,
  deps?: DependencyList
) => {
  const ref = useRef<T>(null);
  const [previousSize, setPreviousSize] = useState<string>();

  const measure = useCallback(() => {
    if (ref.current && callback) {
      const rects = ref.current.getBoundingClientRect();
      const newSize = JSON.stringify(rects);
      if (newSize !== previousSize) {
        setPreviousSize(newSize);
        callback(rects);
      }
    }
  }, [ref, previousSize, callback]);

  useEffect(() => {
    measure();
  }, deps);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
  }, [measure]);

  return ref;
};
