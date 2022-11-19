import axiosRequest from './axios';

export const fetchCommentReply = (
  postId: number | string | undefined,
  commentId: number | string | undefined,
  userId: number | string | undefined
) => {
  return axiosRequest().get(
    `/api/post/${postId}/comment/${commentId}/replies?userId=${userId}`
  );
};
