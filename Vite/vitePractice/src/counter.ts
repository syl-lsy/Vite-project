export const setCounter = (element: HTMLButtonElement) => {
  console.info(
    `%c VITE_OPEN: ${import.meta.env.VITE_OPEN}`,
    'color: red; background: yellow; font-weight: bold; font-size: 20px;padding: 10px; border-radius: 5px;',
  );
  console.time('start'); //计算代码运行时间
  let counter = 0;
  const setUpCounter = (count: number): void => {
    counter = count;
    element.innerHTML = `Counter is ${counter}`;
    console.timeEnd('start');
  };
  setUpCounter(0);
  element.addEventListener('click', () => {
    setUpCounter(counter + 1);
  });
};
