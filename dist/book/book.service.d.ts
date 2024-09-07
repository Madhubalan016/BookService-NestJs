import { Logger } from '@nestjs/common/services';
import { Book } from '../model/book.entity';
import { BookDto } from './book.dto';
import { BookRepository } from './book.repository';
export declare class BookService {
    private readonly repository;
    logger: Logger;
    constructor(repository: BookRepository);
    getAll(): Promise<Book[]>;
    getOne(id: string): Promise<Book>;
    save(book: BookDto): Promise<BookDto & Book>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
