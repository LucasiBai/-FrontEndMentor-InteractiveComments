import { CommentI } from './comment-i';
import { UserI } from './user-i';

export interface DataI {
  currentUser: UserI;
  comments: CommentI[];
}
