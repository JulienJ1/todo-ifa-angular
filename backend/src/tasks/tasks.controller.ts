import { Controller, Request, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Patch('/updateState')
  updateState(@Query('id') id: string, @Query('move') move: string) {
    return this.tasksService.updateState(id, move);
  }

  @Post()
  create(@Request() req,@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto, req.user._id);
  }

  @Get()
  findAll(@Request() req, @Query('state') state: number) {
    return this.tasksService.findAll(req.user._id, state);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
