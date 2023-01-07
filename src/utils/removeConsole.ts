export const removeConsole = () => {
  if (import.meta.env.MODE === 'production') {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    console.log = function no_console() {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    console.warn = function no_console() {};
  }
};
