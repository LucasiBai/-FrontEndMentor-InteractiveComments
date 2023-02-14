import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextButtonComponent } from './components/text-button/text-button.component';

@NgModule({
  declarations: [TextButtonComponent],
  imports: [CommonModule],
  exports: [TextButtonComponent],
})
export class ButtonsModule {}
