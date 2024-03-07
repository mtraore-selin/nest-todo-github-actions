// import { Test, TestingModule } from '@nestjs/testing';

// import { TodoController } from './Todo.controller';
// import { TodoModule } from './Todo.module';
// import { TodoService } from './Todo.service';

// describe('TodoModule', () => {
//   let module: TestingModule;

//   beforeEach(async () => {
//     module = await Test.createTestingModule({
//       imports: [TodoModule],
//     }).compile();
//   });

//   it('should compile the module', async () => {
//     expect(module).toBeDefined();
//   });

//   it('should have Todo components', async () => {
//     expect(module.get(TodoController)).toBeInstanceOf(TodoController);
//     expect(module.get(TodoService)).toBeInstanceOf(TodoService);
//   });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { TodoModule } from './todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('TodoModule', () => {
  let module: TestingModule;
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    module = await Test.createTestingModule({
      imports: [TodoModule, MongooseModule.forRoot(uri)],
    }).compile();
  });

  afterAll(async () => {
    await mongod.stop();
  });

  it('should compile the module', async () => {
    expect(module).toBeDefined();
  });

  it('should have Todo components', async () => {
    const todoController = module.get<TodoController>(TodoController);
    const todoService = module.get<TodoService>(TodoService);

    expect(todoController).toBeInstanceOf(TodoController);
    expect(todoService).toBeInstanceOf(TodoService);
  });
});
