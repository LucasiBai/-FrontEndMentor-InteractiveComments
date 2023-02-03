import { Component, Input } from '@angular/core';
import { UserI } from 'src/app/modules/data/models/user-i';

@Component({
  selector: 'app-user-icon',
  templateUrl: './user-icon.component.html',
  styleUrls: ['./user-icon.component.css'],
})
export class UserIconComponent {
  @Input() user!: UserI;
}
