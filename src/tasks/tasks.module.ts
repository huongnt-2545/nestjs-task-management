import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database.module';
import { taskProviders } from './task.provider';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  // imports: [DatabaseModule, TypeOrmModule.forFeature([TaskRepository])],
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [...taskProviders, TasksService],
})
export class TasksModule {}
