import React, { useEffect, useRef } from "react";

/**
 * Returns and empty div
 * This div will serve as an trigger to load more promotions
 * @param {Object [Function]} fetchMore - will be called at the end of the list
 * @returns
 */
const UIInfiniteScroll = ({ fetchMore }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        fetchMore();
      }
    }, options);

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} />;
};

export default UIInfiniteScroll;
