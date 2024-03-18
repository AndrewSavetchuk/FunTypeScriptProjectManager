import Task, { TaskStatus } from '../models/Task';
import State from './State';

class TaskState extends State<Task> {
  private tasks: Task[] = [];
  private static instance: TaskState;

  private constructor() {
    super();
  }

  static getInstance(): TaskState {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new TaskState();
    return this.instance;
  }

  addTask(newTask: Task): void {
    this.tasks.push(newTask);
    this.updateListeners();
  }

  moveTask(id: string, newStatus: TaskStatus): void {
    const task = this.tasks.find((t) => t.id === id);

    if (task && task.status !== newStatus) {
      task.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners(): void {
    for (const listenerFn of this.listeners) {
      listenerFn(this.tasks.slice());
    }
  }
}

export const taskState = TaskState.getInstance();
