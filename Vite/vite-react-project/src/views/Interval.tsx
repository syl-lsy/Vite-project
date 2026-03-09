import { useState, useEffect } from 'react';
export default function Interval() {
  let timer = null;
  const [count, setCount] = useState(0);
  useEffect(() => {
    timer = setInterval(() => {
      setCount(count => count + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });
  return (
    <>
      <div>
        <h1>Interval</h1>
        count: <span>{count}</span>
      </div>
    </>
  );
}
