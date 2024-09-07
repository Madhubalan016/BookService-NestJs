import { JwtService } from '@nestjs/jwt';
import { userService } from '../userModule/user.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    private readonly hashAlgorithm;
    private readonly hashIterations;
    constructor(jwtService: JwtService, userService: userService);
    private hashPassword;
    validateUser(userName: string, password: string): Promise<{
        id: string;
        userName: string;
    }>;
    login(user: {
        id: string;
        userName: string;
    }): Promise<{
        access_token: string;
    }>;
    verifyToken(token: string): Promise<any>;
}
