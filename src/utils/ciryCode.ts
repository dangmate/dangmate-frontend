export const getCityCode = (sido: string): string => {
  if (sido === '서울') return '11';
  else if (sido === '부산') return '21';
  else if (sido === '대구') return '22';
  else if (sido === '인천') return '23';
  else if (sido === '광주') return '24';
  else if (sido === '대전') return '25';
  else if (sido === '울산') return '26';
  else if (sido === '세종') return '29';
  else if (sido === '경기') return '31';
  else if (sido === '강원') return '32';
  else if (sido === '충북') return '33';
  else if (sido === '충남') return '34';
  else if (sido === '전북') return '35';
  else if (sido === '전남') return '36';
  else if (sido === '경북') return '37';
  else if (sido === '경남') return '38';
  else if (sido === '제주') return '39';
  else return '00';
};
