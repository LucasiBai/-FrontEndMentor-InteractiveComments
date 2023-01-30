import { UserI } from './user-i';
import { CommentI } from './comment-i';

export interface DataI {
  currentUser: UserI;
  comments: CommentI[];
}
