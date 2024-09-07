import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';
import { Book } from '../model/book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('BookService', () => {
  let service: BookService;
  let repository: BookRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useValue:{
              find:jest.fn(),
              findOne:jest.fn(),
              save:jest.fn(),
              delete:jest.fn()
          }
    }],

    }).compile();

    service = module.get<BookService>(BookService);
    repository = module.get<BookRepository>(getRepositoryToken(Book));
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const result= [
        {
          id:'id1',
          bookName:"book1",
          author:"author1",
          releaseDateTime: new Date(),
          createDateTime: new Date(),
          updateDateTime: new Date()
       },
      {
  
          id:'id2',
          bookName:"book2",
          author:"author2",
          releaseDateTime: new Date(),
          createDateTime: new Date(),
          updateDateTime: new Date()
       
      }

      ];
      jest.spyOn(repository, 'find').mockResolvedValue(result);

      expect(await service.getAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a single book', async () => {
      const id = 'id1'
      const result : any= { id: id };
      jest.spyOn(repository, 'findOne').mockResolvedValue(result);

      expect(await service.getOne(id)).toEqual(result);
    });
  });
});
