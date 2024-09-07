import { Test, TestingModule } from "@nestjs/testing";
import { userController } from "./user.controller"
import { userService } from "./user.service";
import { AuthService } from "../auth/auth.service";
import { createUserDto } from "./dto/user.dto";
import { UnauthorizedException } from "@nestjs/common";

describe('user controller ',()=>{

    let controller: userController;
    let service: userService;
    let authservice: AuthService;

    beforeEach(async()=>{
        const module: TestingModule = await Test.createTestingModule({
            controllers:[userController],
            providers:[
                {
                    provide:userService,
                    useValue:{
                         save:jest.fn(),
                         delete:jest.fn()
                    }
                },{
                    provide:AuthService,
                    useValue:{
                       validateUser: jest.fn(),
                       login: jest.fn(),
                    }
                }
            ]

        }).compile();
        controller = module.get<userController>(userController);
        service = module.get<userService>(userService);
        authservice = module.get<AuthService>(AuthService);

    });
    it('should be defined',()=>{
        expect(controller).toBeDefined()
    });

    describe("Register method",()=>{
        it('should be registered',async()=>{
            const result = {
                id: "id1",
                userName:"user 1",
                password: "pass 1",
                salt: "salt 1"
            };
            jest.spyOn(service,'save').mockResolvedValue(result)
            expect(await controller.save(result)).toEqual(result);
        })
    });


    describe('Login method',()=>{
        it("shold be login succesfully",async()=>{
            const user = {
                userName: "user 1",
                password:"password"
             };
            const loginResult = {
               id: "id1",
               userName:"new user"
            };
            const token: any = 'access_token';
            jest.spyOn(authservice,"validateUser").mockResolvedValue(loginResult);
            jest.spyOn(authservice, "login").mockResolvedValue(token);

            expect(await controller.login(user)).toEqual(token);
        });
    });
        describe('delete',()=>{
            it('sholud be Deleted',async()=>{
              const id ="id1";
              const deleteResult = {
                raw: [],
                affected: 1
              }
              jest.spyOn(service,'delete').mockResolvedValue(deleteResult);
              expect(await controller.delete(id)).toEqual(deleteResult);
            });
        })
          
});