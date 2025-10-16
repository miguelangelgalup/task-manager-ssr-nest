import { Injectable } from '@nestjs/common';
import { Task } from './interfaces/tasks.interfaces';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];
    private idCounter = 1;

    constructor () {}

    public async find(): Promise<Task[]> {
        return this.tasks;
    }
}
