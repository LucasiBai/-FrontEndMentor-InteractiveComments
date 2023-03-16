import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserI } from 'src/app/modules/data/models/user-i';
import { UserIconComponent } from './user-icon.component';

const mockUser: UserI = {
  image: {
    png: './images/avatars/image-juliusomo.png',
    webp: './images/avatars/image-juliusomo.webp',
  },
  username: 'juliusomo',
};

describe('Test User Icon', () => {
  let fixture: ComponentFixture<UserIconComponent>;
  let component: UserIconComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserIconComponent);
    component = fixture.componentInstance;
    component.user = mockUser;
    fixture.detectChanges();
  }));

  it('Should render correctly', () => {
    expect(component).toBeTruthy();
  });
});
