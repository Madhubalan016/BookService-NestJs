import { Logger } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './book.dto';
export declare class BookController {
    private bookService;
    logger: Logger;
    constructor(bookService: BookService);
    getAll(): Promise<import("../model/book.entity").Book[]>;
    getOne(params: any): Promise<any>;
    save(itembody: BookDto): Promise<BookDto & import("../model/book.entity").Book>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
