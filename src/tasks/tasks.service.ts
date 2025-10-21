import { Injectable } from '@nestjs/common';
import { Task } from './interfaces/tasks.interfaces';

@Injectable()
export class TasksService {
    private tasks: Task[] = [{ id: 1, title: "Tarea 1", description: "cualquiera", completed: true, priority: "low" }];
    private idCounter = 1;

    constructor() { }

    public async find(): Promise<Task[]> {
        return this.tasks;
    }

    public async create({ task }: { task: Task }) {
        return this.tasks.push(task)
    }
}
