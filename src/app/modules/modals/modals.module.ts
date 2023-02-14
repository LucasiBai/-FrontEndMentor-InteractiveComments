import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomConfirmComponent } from './components/custom-confirm/custom-confirm.component';
import { ConfirmService } from './services/confirm-service.service';
import { ButtonsModule } from '../buttons/buttons.module';

@NgModule({
  declarations: [CustomConfirmComponent],
  imports: [CommonModule, ButtonsModule],
  providers: [ConfirmService],
  exports: [CustomConfirmComponent],
})
export class ModalsModule {}
