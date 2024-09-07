"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var userController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const decorators_1 = require("@nestjs/common/decorators");
const user_dto_1 = require("./dto/user.dto");
const auth_service_1 = require("../auth/auth.service");
const jwtAuth_guard_1 = require("../guard/jwtAuth.guard");
let userController = userController_1 = class userController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
        this.logger = new common_1.Logger(userController_1.name);
    }
    async save(createUserDto) {
        this.logger.debug("Register user: " + JSON.stringify(createUserDto));
        return await this.userService.save(createUserDto);
    }
    async login(user) {
        const validUser = await this.authService.validateUser(user.userName, user.password);
        if (validUser) {
            return this.authService.login(validUser);
        }
        else {
            throw new common_1.UnauthorizedException('Invalid user credentials');
        }
    }
    async delete(id) {
        this.logger.debug("User logout successfully");
        return await this.userService.delete(id);
    }
};
exports.userController = userController;
__decorate([
    (0, decorators_1.Post)('/register'),
    __param(0, (0, decorators_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.createUserDto]),
    __metadata("design:returntype", Promise)
], userController.prototype, "save", null);
__decorate([
    (0, decorators_1.Post)('/login'),
    __param(0, (0, decorators_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "login", null);
__decorate([
    (0, decorators_1.Delete)('/logout/:id'),
    (0, decorators_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    __param(0, (0, decorators_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], userController.prototype, "delete", null);
exports.userController = userController = userController_1 = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.userService,
        auth_service_1.AuthService])
], userController);
//# sourceMappingURL=user.controller.js.map