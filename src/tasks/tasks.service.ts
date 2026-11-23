import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.interface.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { randomUUID } from 'node:crypto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getTasks(): Task[] {
        return this.tasks;
    }

    getTask(id: string): Task {
        const task = this.tasks.find((task) => task.id === id);

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return task;
    }

    create(createTaskDto: CreateTaskDto): Task {
        const task: Task = {
            id: randomUUID(),
            title: createTaskDto.title,
            description: createTaskDto.description,
            completed: createTaskDto.completed ?? false,
        };

        this.tasks.push(task);

        return task;
    }

    update(id: string, updateTaskDto: UpdateTaskDto): Task | undefined {
        const task = this.getTask(id);

        Object.assign(task, updateTaskDto);

        return task;
    }

    remove(id: string): void {
        this.getTask(id);

        this.tasks = this.tasks.filter((task) => task.id !== id);
    }
}