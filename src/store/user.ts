import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { UserType } from '../api/type';

const { persistAtom } = recoilPersist();

export const userState = atom({
  key: 'userState',
  default: {
    email: '',
    fullName: '',
    location: '',
    userId: 0,
    profile: null
  } as UserType,
  effects_UNSTABLE: [persistAtom]
});
