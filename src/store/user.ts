import { atom } from 'recoil';

interface UserType {
  email: string;
  fullName: string;
  location: string;
  userId: number;
}

export const userState = atom({
  key: 'userState',
  default: {
    email: '',
    fullName: '',
    location: '',
    userId: 0
  } as UserType
});
