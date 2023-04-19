import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';
import { getModelToken } from '@nestjs/mongoose';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService, {
        provide: getModelToken('User'),
        useValue: {
          findOne: jest.fn(),
        },
      },]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the availability of a username', async () => {
    const username = 'notato';
    const expectedResult = { available: true };

    jest.spyOn(usersService, 'isUsernameAvailable').mockImplementation(() => Promise.resolve(true));

    const result = await controller.isUsernameAvailable(username);
    expect(result).toEqual(expectedResult);
  });
});
