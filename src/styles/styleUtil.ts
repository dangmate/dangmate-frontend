// px -> vw
export const getVwValue = (value: string) => {
  const $width = 360;
  return value
    .split(' ')
    .map((item) => ((+item / $width) * 100).toFixed(3) + 'vw')
    .join(' ');
};
