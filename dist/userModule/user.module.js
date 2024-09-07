"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const user_repository_1 = require("./user.repository");
const dist_1 = require("@nestjs/typeorm/dist");
const user_entity_1 = require("./entity/user.entity");
const auth_module_1 = require("../auth/auth.module");
let userModule = class userModule {
};
exports.userModule = userModule;
exports.userModule = userModule = __decorate([
    (0, common_1.Module)({
        imports: [dist_1.TypeOrmModule.forFeature([user_entity_1.User]),
            auth_module_1.AuthModule],
        controllers: [user_controller_1.userController],
        providers: [user_service_1.userService, user_repository_1.UsersRepository],
    })
], userModule);
//# sourceMappingURL=user.module.js.map