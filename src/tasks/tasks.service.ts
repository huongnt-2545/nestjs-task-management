import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,
  ) {}
  // constructor(@InjectRepository(Task) private taskRepository: TaskRepository) {}

  async getTaskById(id: number, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();

    delete task.user;
    return task;
  }

  async getTasks(
    filterTaskDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    const { status, searchString } = filterTaskDto;
    const query = this.taskRepository.createQueryBuilder('task');

    query.andWhere('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (searchString) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${searchString}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async deleteTaskById(id: number, user: User): Promise<void> {
    const task: Task = await this.getTaskById(id, user);

    // const result = await this.taskRepository.remove(task);
    const result = await this.taskRepository.delete({ id, userId: user.id });

    if (result.affected == 0) {
      throw new NotFoundException('Something went wrong when delete task!');
    }
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task: Task = await this.getTaskById(id, user);
    task.status = status;
    task.save();

    return task;
  }

  async updateTaskInfo(
    id: number,
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    const { title, description } = createTaskDto;
    task.title = title;
    task.description = description;
    task.save();

    return task;
  }
}
