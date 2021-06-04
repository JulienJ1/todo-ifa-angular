import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument, TaskFilter } from './entities/task.entity';
import * as mongoose from 'mongoose';

@Injectable()
export class TasksService {

  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {
  }

  create(createTaskDto: CreateTaskDto, userId: string) {


    const newTask: Task = { ...createTaskDto, state: 0, user: mongoose.Types.ObjectId(userId) }


    const createTask = new this.taskModel(newTask);
    return createTask.save();
  }

  findAll(userId: string, state: number) {
    console.log(userId)
    const filter: TaskFilter = { user: mongoose.Types.ObjectId(userId) };

    if (state) {
      filter.state = state;
    }

    return this.taskModel.find(filter).exec();
  }

  findOne(id: string) {
    return this.taskModel.findById(id);
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto);
  }

  async updateState(id: string, move: string) {
    const task = await this.taskModel.findOne({ _id: id }).exec()

    move === 'up' ? task.state++ : task.state--;

    return this.taskModel.findByIdAndUpdate(id, task);

  }

  remove(id: string) {
    return this.taskModel.findByIdAndRemove(id);
  }
}
