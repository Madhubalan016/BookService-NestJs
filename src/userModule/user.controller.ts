import { Controller, Logger, UnauthorizedException } from '@nestjs/common';
import { userService } from './user.service';
import { Param, Post, Body, Delete, UseGuards, } from '@nestjs/common/decorators';
import { createUserDto } from './dto/user.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../guard/jwtAuth.guard';

@Controller('user')
export class userController {
    logger = new Logger(userController.name);

    constructor(private readonly userService: userService,
        private readonly authService: AuthService
    ) {}

    @Post('/register')
  public async save(@Body() createUserDto: createUserDto) {
    this.logger.debug("Register user: " + JSON.stringify(createUserDto));
    return await this.userService.save(createUserDto);
  }

  @Post('/login')
  public async login(@Body() user: { userName: string; password:string }) {
    const validUser= await this.authService.validateUser(user.userName,user.password);
    if(validUser){
        return this.authService.login(validUser);
    }else{
        throw new UnauthorizedException('Invalid user credentials');
    }
   
  }

  @Delete('/logout/:id')
  @UseGuards(JwtAuthGuard) 
  public async delete(@Param('id') id: string) {
    this.logger.debug("User logout successfully");
    return await this.userService.delete(id);
  }
}