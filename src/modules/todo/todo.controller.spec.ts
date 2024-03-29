import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  const mockTodoService = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    markAsInActive: jest.fn(),
  };
  const todoMock = { description: 'desc', is_active: false };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
      controllers: [TodoController],
    })
      .overrideProvider(TodoService)
      .useValue(mockTodoService)
      .compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#getAll', () => {
    beforeEach(() => {
      jest.spyOn(service, 'getAll');
    });

    it('should be defined', () => {
      expect(service.getAll).toBeDefined();
    });

    it('should call service.getAll', () => {
      controller.getAll();
      expect(service.getAll).toBeCalledTimes(1);
    });
  });

  describe('#get', () => {
    beforeEach(() => {
      jest.spyOn(service, 'getById');
    });

    it('should be defined', () => {
      expect(service.getById).toBeDefined();
    });

    it('should call service.get', () => {
      controller.get({ id: '1' });
      expect(service.getById).toBeCalledTimes(1);
    });
  });

  describe('#create', () => {
    beforeEach(() => {
      jest.spyOn(service, 'create');
    });

    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should call service.create', () => {
      controller.create(todoMock);
      expect(service.create).toBeCalledTimes(1);
    });
  });

  describe('#update', () => {
    beforeEach(() => {
      jest.spyOn(service, 'update');
    });

    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('should call service.update', () => {
      controller.update({ id: 'id' }, { description: 'des' });
      expect(service.update).toBeCalledTimes(1);
    });
  });

  describe('#delete', () => {
    beforeEach(() => {
      jest.spyOn(service, 'delete');
    });

    it('should be defined', () => {
      expect(service.delete).toBeDefined();
    });

    it('should call service.delete', () => {
      controller.delete({ id: '1' });
      expect(service.delete).toBeCalledTimes(1);
    });
  });

  describe('#markAsInActive', () => {
    beforeEach(() => {
      jest.spyOn(service, 'markAsInActive');
    });

    it('should be defined', () => {
      expect(service.markAsInActive).toBeDefined();
    });

    it('should call service.markAsInActive', () => {
      controller.markAsInActive({ id: '1' });
      expect(service.markAsInActive).toBeCalledTimes(1);
    });
  });
});
