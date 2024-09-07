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
var BookController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const book_service_1 = require("./book.service");
const decorators_1 = require("@nestjs/common/decorators");
const book_dto_1 = require("./book.dto");
let BookController = BookController_1 = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
        this.logger = new common_1.Logger(BookController_1.name);
    }
    async getAll() {
        this.logger.debug("Get all books");
        return await this.bookService.getAll();
    }
    async getOne(params) {
        this.logger.debug("Get book by id Request");
        return await this.bookService.getOne(params.id);
    }
    async save(itembody) {
        this.logger.debug("Saving book " + itembody);
        return await this.bookService.save(itembody);
    }
    async delete(id) {
        this.logger.debug("Book deleted Successfully");
        return await this.bookService.delete(id);
    }
};
exports.BookController = BookController;
__decorate([
    (0, decorators_1.Get)('AllBook'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getAll", null);
__decorate([
    (0, decorators_1.Get)(':id'),
    __param(0, (0, decorators_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getOne", null);
__decorate([
    (0, decorators_1.Post)('/addBook'),
    __param(0, (0, decorators_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_dto_1.BookDto]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "save", null);
__decorate([
    (0, decorators_1.Delete)('/delete/:id'),
    __param(0, (0, decorators_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "delete", null);
exports.BookController = BookController = BookController_1 = __decorate([
    (0, common_1.Controller)('book'),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
//# sourceMappingURL=book.controller.js.map