import React, { useEffect, useState } from "react";

export function useTimer(isStart) {
  const [count, setCount] = useState(9);

  useEffect(() => {
    if (isStart) {
      const secondsLeft = setInterval(() => {
        setCount((c) => c - 1);
      }, 1000);
      return () => clearInterval(secondsLeft);
    }
  }, [isStart]);

  return count;
}
