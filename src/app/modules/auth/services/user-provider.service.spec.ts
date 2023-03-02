import { UserI } from '../../data/models/user-i';
import { UserProviderService } from './user-provider.service';

describe('User Provider', () => {
  let service: UserProviderService;

  beforeEach(() => {
    service = new UserProviderService();
  });

  it('Should return current user data', () => {
    expect(service).toBeDefined();

    service.currentUser.subscribe((userData: UserI) => {
      expect(userData).toEqual({
        image: {
          png: './assets/images/avatars/image-juliusomo.png',
          webp: './assets/images/avatars/image-juliusomo.webp',
        },
        username: 'juliusomo',
      });
    });
  });

  it('Should update current user', () => {
    expect(service).toBeDefined();

    const mock_new_user = {
      image: {
        png: './assets/images/avatars/image-juliusomo.png',
        webp: './assets/images/avatars/image-juliusomo.webp',
      },
      username: 'juliusomo',
    };

    service.setCurrentUser = mock_new_user;

    service.currentUser.subscribe((userData: UserI) => {
      expect(userData).toEqual(mock_new_user);
    });
  });
});
