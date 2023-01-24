import { UserI } from './user-i';

export interface CommentI {
  id?: number;
  content: string;
  createdAt?: string;
  score: number;
  user: UserI;
  replies: CommentI[];
  replyingTo: string | undefined;
}
