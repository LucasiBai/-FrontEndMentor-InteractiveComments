import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmService } from '../../services/confirm-service.service';

@Component({
  selector: 'app-custom-confirm',
  templateUrl: './custom-confirm.component.html',
  styleUrls: ['./custom-confirm.component.css'],
})
export class CustomConfirmComponent implements OnInit {
  constructor(private _confirm: ConfirmService) {}

  @Input() header!: string;
  @Input() content!: string;

  isConfirming!: Observable<boolean>;

  ngOnInit() {
    this.isConfirming = this._confirm.isConfirming;
  }

  closeModal() {
    this._confirm.closeModal();
  }
}
