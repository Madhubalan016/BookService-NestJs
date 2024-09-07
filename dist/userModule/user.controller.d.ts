import { Logger } from '@nestjs/common';
import { userService } from './user.service';
import { createUserDto } from './dto/user.dto';
import { AuthService } from '../auth/auth.service';
export declare class userController {
    private readonly userService;
    private readonly authService;
    logger: Logger;
    constructor(userService: userService, authService: AuthService);
    save(createUserDto: createUserDto): Promise<import("./entity/user.entity").User>;
    login(user: {
        userName: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
