import { atom } from 'recoil';

export const CommentUserState = atom({
  key: 'CommentUserState',
  default: ''
});

export const ReplyMode = atom({
  key: 'ReplyMode',
  default: false
});

export const CommentIdState = atom({
  key: 'CommentIdState',
  default: 0
});
