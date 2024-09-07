import { AuthService } from './auth.service';
import { userService } from '../userModule/user.service';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: userService);
}
