import { Test, TestingModule } from '@nestjs/testing';
import { ToDo } from 'src/modules/todo/Todo.model';
import { TodoModule } from './todo.module';
import { TodoService } from './todo.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';

describe('TodoService', () => {
  let service: TodoService;
  let mongod: MongoMemoryServer;

  const mockDataBaseService = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    markAsInActive: jest.fn(),
  };

  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [TodoModule, MongooseModule.forRoot(uri)],
    })
      .overrideProvider(TodoService)
      .useValue(mockDataBaseService)
      .compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should have the service defined', () => {
    expect(service).toBeDefined();
  });

  describe('#getAll', () => {
    beforeEach(() => {
      jest.spyOn(mockDataBaseService, 'getAll');
    });

    it('should be defined', () => {
      expect(service.getAll).toBeDefined();
    });

    it('should call the database', () => {
      service.getAll();
      expect(mockDataBaseService.getAll).toBeCalledTimes(1);
    });
  });

  describe('#getById', () => {
    beforeEach(() => {
      jest.spyOn(mockDataBaseService, 'getById');
    });

    it('should be defined', () => {
      expect(service.getById).toBeDefined();
    });

    it('should call the database', () => {
      service.getById('1');
      expect(mockDataBaseService.getById).toBeCalledTimes(1);
    });
  });

  describe('#create', () => {
    beforeEach(() => {
      jest.spyOn(mockDataBaseService, 'create');
    });

    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should call the database', () => {
      service.create({} as ToDo);
      expect(mockDataBaseService.create).toBeCalledTimes(1);
    });
  });

  describe('#update', () => {
    beforeEach(() => {
      jest.spyOn(mockDataBaseService, 'update');
    });

    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('should call the database', () => {
      service.update('id', { description: 'des' });
      expect(mockDataBaseService.update).toBeCalledTimes(1);
    });
  });

  describe('#delete', () => {
    beforeEach(() => {
      jest.spyOn(mockDataBaseService, 'delete');
    });

    it('should be defined', () => {
      expect(service.delete).toBeDefined();
    });

    it('should call the database', () => {
      service.delete('1');
      expect(mockDataBaseService.delete).toBeCalledTimes(1);
    });
  });

  describe('#markAsInActive', () => {
    beforeEach(() => {
      jest.spyOn(mockDataBaseService, 'getById');
      jest.spyOn(mockDataBaseService, 'update');
    });

    it('should be defined', () => {
      expect(service.markAsInActive).toBeDefined();
    });

    describe('when inactive is called', () => {
      it('should call the databaseService.get', () => {
        expect(mockDataBaseService.getById).toBeCalledTimes(1);
      });

      it('should call the databaseService.update', () => {
        expect(mockDataBaseService.update).toBeCalledTimes(1);
      });
    });
  });
});
