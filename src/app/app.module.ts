import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { DataModule } from './modules/data/data.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AuthModule, DataModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
