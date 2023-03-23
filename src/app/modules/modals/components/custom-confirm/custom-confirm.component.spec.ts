import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ButtonsModule } from 'src/app/modules/buttons/buttons.module';
import { ConfirmI } from '../../models/confirm-i';
import { CustomConfirmComponent } from './custom-confirm.component';

let exucuted = false;

const confirmData: ConfirmI = {
  isConfirming: true,
  action: () => (exucuted = true),
  header: 'Test Header',
  content: '',
};

describe('Test Custom Confirm Modal', () => {
  let fixture: ComponentFixture<CustomConfirmComponent>;
  let component: CustomConfirmComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CustomConfirmComponent],
      imports: [ButtonsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomConfirmComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('Should render modal', () => {
    expect(component).toBeTruthy();
  });

  it('Should not render in DOM as init', () => {
    const domComponent =
      fixture.debugElement.nativeElement.querySelector('.modal__box');
    expect(domComponent).toBeFalsy();
  });

  describe('Test render modal', () => {
    beforeEach(() => {
      component.confirmData = confirmData;
      fixture.detectChanges();
    });

    it('Should render modal with confirm data', () => {
      const domComponent =
        fixture.debugElement.nativeElement.querySelector('.modal__box');
      expect(domComponent).toBeTruthy();

      const h5 = fixture.debugElement.nativeElement.querySelector('h5');
      expect(h5).toBeTruthy();
      expect(h5.innerText).toEqual(confirmData.header);

      const p = fixture.debugElement.nativeElement.querySelector('p');
      expect(p).toBeFalsy();
    });

    it('Should render modal with content', () => {
      const confirmDataContent = { ...confirmData, content: 'Test Content' };
      component.confirmData = confirmDataContent;
      fixture.detectChanges();

      const domComponent =
        fixture.debugElement.nativeElement.querySelector('.modal__box');
      expect(domComponent).toBeTruthy();

      const h5 = fixture.debugElement.nativeElement.querySelector('h5');
      expect(h5).toBeTruthy();
      expect(h5.innerText).toEqual(confirmData.header);

      const p = fixture.debugElement.nativeElement.querySelector('p');
      expect(p).toBeTruthy();
      expect(p.innerText).toEqual(confirmDataContent.content);
    });
  });

  describe('Test closeModal()', () => {
    beforeEach(() => {
      component.confirmData = confirmData;
      fixture.detectChanges();
    });

    it('Should close open modal', () => {
      const domTreeOpen =
        fixture.debugElement.nativeElement.querySelector('.modal__box');
      expect(domTreeOpen).toBeTruthy();

      component.closeModal();
      fixture.detectChanges();

      const domTreeClose =
        fixture.debugElement.nativeElement.querySelector('.modal__box');
      expect(domTreeClose).toBeFalsy();
    });
  });

  describe('Test executeAction()', () => {
    beforeEach(() => {
      component.confirmData = confirmData;
      fixture.detectChanges();
    });

    it('Should execute modal data action', () => {
      const domTreeOpen =
        fixture.debugElement.nativeElement.querySelector('.modal__box');
      expect(domTreeOpen).toBeTruthy();

      component.executeAction();

      expect(exucuted).toBeTrue();
      exucuted = false;
    });

    it('Should close modal at finish', () => {
      const domTreeOpen =
        fixture.debugElement.nativeElement.querySelector('.modal__box');
      expect(domTreeOpen).toBeTruthy();

      component.executeAction();
      fixture.detectChanges();

      const domTreeClose =
        fixture.debugElement.nativeElement.querySelector('.modal__box');
      expect(domTreeClose).toBeFalsy();
      exucuted = false;
    });
  });
});
