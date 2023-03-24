import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs';
import { ConfirmI } from '../models/confirm-i';
import { ConfirmService } from './confirm-service.service';

describe('Test Confirm Service', () => {
  let service: ConfirmService;

  beforeEach(() => {
    service = TestBed.inject(ConfirmService);
  });

  describe('Test isConfirming()', () => {
    it('Should return current confirm', () => {
      service.isConfirming.pipe(first()).subscribe((isConfirming: ConfirmI) => {
        expect(isConfirming.isConfirming).toBeFalse();
        expect(isConfirming.header).toBeFalsy();
        expect(isConfirming.content).toBeFalsy();
      });
    });
  });

  describe('Test confirm()', () => {
    it('Should update current confirm', () => {
      const mockConfirm: ConfirmI = {
        isConfirming: false,
        action: () => 'test function',
        header: 'Test Header confirm',
        content: 'Test Content confirm',
      };

      service.confirm(
        mockConfirm.header,
        mockConfirm.content,
        mockConfirm.action
      );

      service.isConfirming.pipe(first()).subscribe((isConfirming: ConfirmI) => {
        expect(isConfirming.isConfirming).toBeTrue();
        expect(isConfirming.header).toEqual(mockConfirm.header);
        expect(isConfirming.content).toEqual(mockConfirm.content);
        expect(isConfirming.action).toEqual(mockConfirm.action);
      });
    });
  });

  describe('Test closeModal()', () => {
    it('Should update isConfirming with initConfirm', () => {
      const mockConfirm: ConfirmI = {
        isConfirming: false,
        action: () => 'test function',
        header: 'Test Header confirm',
        content: 'Test Content confirm',
      };

      service.confirm(
        mockConfirm.header,
        mockConfirm.content,
        mockConfirm.action
      );

      service.closeModal();

      service.isConfirming.pipe(first()).subscribe((isConfirming: ConfirmI) => {
        expect(isConfirming.isConfirming).toBeFalse();
        expect(isConfirming.header).toBeFalsy();
        expect(isConfirming.content).toBeFalsy();
      });
    });
  });
});
