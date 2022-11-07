import { atom } from 'recoil';

interface UserType {
  email: string;
  fullName: string;
  location: string;
}

export const userState = atom({
  key: 'userState',
  default: {
    email: '',
    fullName: '',
    location: ''
  } as UserType
});
