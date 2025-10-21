import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './interfaces/tasks.interfaces';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    public getTasks() {
        return this.tasksService.find();
    }

    @Post('/create-task')
    @HttpCode(HttpStatus.CREATED)
    public createTask(@Body() data: Task) {

        return this.tasksService.create({ task: data })
    }
    // TODO: createTask, updateTask, deleteTask
}
