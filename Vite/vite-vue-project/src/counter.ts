export const setCounter = (element: HTMLButtonElement) => {
  console.log(
    `%c VITE_OPEN: ${import.meta.env.VITE_OPEN}`,
    'color: red; background: yellow; font-weight: bold; font-size: 20px;padding: 10px; border-radius: 5px;',
  );
  let counter = 0;
  const setUpCounter = (count: number): void => {
    counter = count;
    element.innerHTML = `Counter is ${counter}`;
  };
  setUpCounter(0);
  element.addEventListener('click', () => {
    setUpCounter(counter + 1);
  });
};
