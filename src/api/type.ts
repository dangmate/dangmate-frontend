export interface ReplyType {
  content: string;
  createdAt: string;
  fullName: string;
  isReply: false;
  profile: null | string;
  replyId: number;
}

export interface UserType {
  email: string;
  fullName: string;
  location: string;
  userId: number;
}

export interface CardType {
  category: string;
  content: string;
  createdAt: string;
  fullName: string;
  location: string;
  profile: string;
  thumbnail: string;
  comments: number;
  likes: number;
  postId: number;
  isLike?: boolean;
}

export interface CardViewType {
  category: string;
  comment: number;
  content: string;
  createdAt: string;
  isLike: boolean;
  isPost: boolean;
  likes: number;
  fullName: string;
  location: string;
  postId: number;
  profile: string | null | undefined;
  thumbnail: string | null;
  views: number;
  relatedUsers: number;
}
