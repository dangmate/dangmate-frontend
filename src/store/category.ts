import { atom } from 'recoil';
import { Dispatch, SetStateAction } from 'react';

interface IProp {
  isCategory: string;
  setCategory: Dispatch<SetStateAction<string>>;
}
export const categoryState = atom({
  key: 'categoryState',
  default: 'all'
});
