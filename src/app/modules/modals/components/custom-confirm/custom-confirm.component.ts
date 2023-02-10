import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmI } from '../../models/confirm-i';
import { ConfirmService } from '../../services/confirm-service.service';

@Component({
  selector: 'app-custom-confirm',
  templateUrl: './custom-confirm.component.html',
  styleUrls: ['./custom-confirm.component.css'],
})
export class CustomConfirmComponent implements OnInit {
  constructor(private _confirm: ConfirmService) {}

  confirmData!: ConfirmI;

  ngOnInit() {
    this._confirm.isConfirming.subscribe(
      (confirming: ConfirmI) => (this.confirmData = confirming)
    );
  }

  closeModal() {
    this._confirm.closeModal();
  }

  executeAction() {
    this.confirmData.action();
    this.closeModal();
  }
}
