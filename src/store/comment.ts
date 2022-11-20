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

export const UpdateMode = atom({
  key: 'UpdateMode',
  default: false
});

export const CommentUpdateState = atom({
  key: 'CommentUpdateState',
  default: {
    commentId: 0,
    replyId: 0,
    content: ''
  }
});
