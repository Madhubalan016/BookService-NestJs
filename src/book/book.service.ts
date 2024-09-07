import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { Book } from '../model/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookDto } from './book.dto';
import { Repository } from 'typeorm';
import { BookRepository } from './book.repository';
 

@Injectable()
export class BookService {
    logger = new Logger(BookService.name);
    
    constructor(@InjectRepository(Book) private readonly repository: BookRepository) { }

    public async getAll() {
        this.logger.debug("Find all books from repository");
        return await this.repository.find();
    }

    public async getOne(id: string) {
        this.logger.debug("Find book with id in repository " + id);
        return await this.repository.findOne({
          where:{
            id:id,
          },
        });
    }

    public async save(book: BookDto) {
        this.logger.debug("Saving book " + book);
        return await this.repository.save(book);
    }

    public async delete(id: string){
       this.logger.debug("Find deleted book" );
       return await this.repository.delete(id)
       
    }
}