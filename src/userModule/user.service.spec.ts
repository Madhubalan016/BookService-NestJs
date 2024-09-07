import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { userService } from '../userModule/user.service';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let mockUserService: Partial<userService>;

  beforeEach(async () => {
    mockUserService = {
      findOne: jest.fn().mockResolvedValue({
        id: '1',
        userName: 'testUser',
        password: 'hashedPassword',
        salt: 'randomSalt',
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        { provide: userService, useValue: mockUserService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const user = { id: '1', userName: 'testUser' };
      const token = 'testToken';
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = await authService.login(user);
      expect(result).toEqual({ access_token: token });
    });
  });

  describe('verifyToken', () => {
    it('should return decoded token if valid', async () => {
      const token = 'validToken';
      const decodedToken = { username: 'testUser', sub: '1' };
      jest.spyOn(jwtService, 'verify').mockReturnValue(decodedToken);

      const result = await authService.verifyToken(token);
      expect(result).toEqual(decodedToken);
    });

    it('should throw UnauthorizedException if token is invalid', async () => {
      const token = 'invalidToken';
      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new Error();
      });

      await expect(authService.verifyToken(token)).rejects.toThrow(UnauthorizedException);
    });
  });
});