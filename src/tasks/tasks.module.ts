import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database.module';
import { taskProviders } from './task.provider';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  // imports: [DatabaseModule, TypeOrmModule.forFeature([TaskRepository])],
  imports: [DatabaseModule, AuthModule],
  controllers: [TasksController],
  providers: [...taskProviders, TasksService],
})
export class TasksModule {}
