import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userService } from '../userModule/user.service';
import { createUserDto } from '../userModule/dto/user.dto';

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: userService,
      ) {}
}

