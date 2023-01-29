import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { UserProviderService } from './services/user-provider.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthRoutingModule],
  providers: [UserProviderService],
})
export class AuthModule {}
