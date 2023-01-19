import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { CommentsContainerComponent } from './pages/comments-container/comments-container.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: CommentsContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
