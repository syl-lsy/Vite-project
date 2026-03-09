import { useState } from 'react';
import State from './src/views/State';
import Interval from './src/views/Interval';
export const App = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className='container'>
        <h1>React + Vite</h1>
        <button onClick={() => setCount(count + 1)}>count is {count}</button>
      </div>
      <State />
      <Interval />
    </>
  );
};

export default App;
