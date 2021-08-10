import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  //Define parameter implicit
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): string {
    const taskDeleted = this.tasksService.deleteTaskById(id);

    if (!taskDeleted) {
      return 'Somgthing went wrong when delete task!';
    }

    return `Task ${id} was deleted!`;
  }

  //Define parameter explicit
  //   @Post()
  //   createTask(@Body() data): Task {
  //     return this.tasksService.createTask(data['title'], data['description']);
  //   }
}
