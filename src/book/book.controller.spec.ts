import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from '../model/book.entity';
import { raw } from 'express';

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers:[
        {
         provide: BookService,
         useValue:{
          getAll: jest.fn().mockResolvedValue([]),
          getOne: jest.fn().mockResolvedValue({}),
          save: jest.fn().mockResolvedValue({}),
          delete: jest.fn().mockResolvedValue({}),
         }

    }]
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });
   it('should be defined',()=>{
    expect(controller).toBeDefined();
   })
  describe('getAll method', () => {
  it('it should be return All book data',async()=>{

    const mockdata =[];
    const result = await controller.getAll(); 
    jest.spyOn(service,'getAll').mockResolvedValue(mockdata);
    expect(result).toEqual(mockdata);
  });

});
describe('getOne method',()=>{
  it('should be get one value',async()=>{
    const result : any={id:"id1"};
    jest.spyOn(service,"getOne").mockResolvedValue(result);
    expect(await controller.getOne(result)).toEqual(result);
  })
})

describe('save', () => {
  it('should save a book', async () => {
    const dto : Book={
        id:'id1',
        bookName:"book1",
        author:"author1",
        releaseDateTime: new Date(),
        createDateTime: new Date(),
        updateDateTime: new Date()
    }
    jest.spyOn(service, 'save').mockResolvedValue(dto);
    expect(await controller.save(dto)).toEqual(dto);
  });
});

describe('delete',()=>{
  it('should be deleted',async()=>{
    const id = 'id1';
    const mockData:any = { raw: [], affected: 1};

     jest.spyOn(service,"delete").mockResolvedValue(mockData);
     expect(await controller.delete(id)).toEqual(mockData);

  })
})
});
