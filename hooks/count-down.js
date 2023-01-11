import React, { useEffect, useState } from "react";

export function useTimer(isStart, sec = 60) {
  const [count, setCount] = useState(sec);

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
