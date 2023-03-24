import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextButtonComponent } from './text-button.component';

describe('Text Button', () => {
  let fixture: ComponentFixture<TextButtonComponent>;
  let component: TextButtonComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TextButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should render Text Button', () => {
    expect(component).toBeTruthy();

    expect(component.color).toEqual('hsl(213, 10%, 45%)');
  });

  describe('Test with passing hsl color', () => {
    beforeEach(() => {
      component.hue = '50';
      component.lightness = '100';
      component.saturation = '30';
      fixture.detectChanges();
    });
    describe('Test setHoverLightness()', () => {
      it('Should lower the brightness', () => {
        component.setHoverLightness();

        expect(component.color).toEqual(
          `hsl(${component.hue}, ${component.saturation}%, ${
            Number(component.lightness) - 10
          }%)`
        );
      });
    });

    describe('Test setLeaveLightness()', () => {
      it('Should set the initColor', () => {
        component.setHoverLightness();

        component.setLeaveLightness();

        expect(component.color).toEqual(
          `hsl(${component.hue}, ${component.saturation}%, ${component.lightness}%)`
        );
      });
    });
  });
});
