import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ModalsModule } from './modules/modals/modals.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommentsModule } from './modules/comments/comments.module';
import { DataModule } from './modules/data/data.module';

import { AppComponent } from './app.component';

import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  declarations: [AppComponent, HomePageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommentsModule,
    AuthModule,
    DataModule,
    ModalsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
