import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { ToDo } from 'src/modules/todo/Todo.model';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './create-todo.dto';
import { UpdateTodoDto } from './update-todo.dto';

@ApiTags('ToDo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get(':id')
  @ApiParam({ name: 'id', required: true })
  get(@Param() params: { id: string }): Promise<ToDo> {
    return this.todoService.getById(params.id);
  }

  @Get()
  getAll(): Promise<ToDo[]> {
    return this.todoService.getAll();
  }

  @Post()
  create(@Body() body: CreateTodoDto): Promise<ToDo> {
    return this.todoService.create(body);
  }

  @Put(':id')
  @ApiParam({ name: 'id', required: true })
  update(
    @Param() params: { id: string },
    @Body() body: UpdateTodoDto,
  ): Promise<ToDo> {
    return this.todoService.update(params.id, body);
  }

  @Put('inactive/:id')
  @ApiParam({ name: 'id', required: true })
  markAsInActive(@Param() params: { id: string }): Promise<ToDo> {
    return this.todoService.markAsInActive(params.id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true })
  delete(@Param() params: { id: string }): Promise<unknown> {
    return this.todoService.delete(params.id);
  }
}
