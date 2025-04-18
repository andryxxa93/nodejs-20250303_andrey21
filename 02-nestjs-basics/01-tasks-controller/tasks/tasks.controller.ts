import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.model";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks()
  }

  @Get(":id")
  getTaskById(@Param("id") id: string) {
    const task = this.tasksService.getTaskById(id);
    if (!task) {
      throw new NotFoundException('404');
    }
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() task: Task) {
    return this.tasksService.createTask(task);
  }

  @Patch(":id")
  updateTask(@Param("id") id: string, @Body() task: Task) {
    const taskToPatch = this.tasksService.updateTask(id, task);
    if (!taskToPatch) {
      throw new NotFoundException('404');
    }
    return taskToPatch;
  }

  @Delete(":id")
  deleteTask(@Param("id") id: string) {
    const task = this.tasksService.deleteTask(id);
    if (!task) {
      throw new NotFoundException('404');
    }
    return task;
  }
}
