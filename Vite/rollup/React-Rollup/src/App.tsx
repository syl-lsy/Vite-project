import React, { useState } from 'react';
import reactPng from './assets/react.png';
import rollupSvg from './assets/rollup.svg';
import styles from './styles/app.module.scss';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h2>hello world</h2>
      <button
        className={styles.button}
        onClick={() => {
          setCount(count + 1);
        }}
      >
        count is {count}
      </button>
      <img
        className={styles.img}
        src={reactPng}
        alt=''
      />
      <img
        className={styles.img}
        src={rollupSvg}
        alt=''
      />
    </>
  );
}

export default App;
