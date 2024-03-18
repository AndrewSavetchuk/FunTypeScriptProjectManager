import Component from './Component';
import Task, { TaskStatus } from '../models/Task';
import TaskItem from './TaskItem';
import autobind from '../decorators/autobind';
import { DragTarget } from '../models/DragDrop';
import { taskState } from '../state/TaskState';

export default class TaskList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
  tasks: Task[];

  constructor(private type: 'active' | 'finished') {
    super('js-task-list', 'app', false, `${type}-tasks`);
    this.tasks = [];

    this.configure();
    this.renderContent();
  }

  configure(): void {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);

    taskState.addListener((tasks: Task[]) => {
      this.tasks = tasks.filter((t: Task) => {
        return t.status === (this.type === 'active' ? TaskStatus.Active : TaskStatus.Finished);
      });
      this.renderTasks();
    });
  }

  renderContent(): void {
    this.element.querySelector('ul')!.id = `js-task-list-${this.type}`;
    this.element.querySelector('h2')!.textContent = `${this.type.toUpperCase()} TASKS`;
  }

  @autobind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      this.element.querySelector('ul')!.classList.add('droppable');
    }
  }

  @autobind
  dragLeaveHandler(event: DragEvent): void {
    this.element.querySelector('ul')!.classList.remove('droppable');
  }

  @autobind
  dropHandler(event: DragEvent): void {
    event.preventDefault()

    const taskId = event.dataTransfer!.getData('text/plain');
    taskState.moveTask(taskId, this.type === 'active' ? TaskStatus.Active : TaskStatus.Finished);
    this.element.querySelector('ul')!.classList.remove('droppable');
  }

  private renderTasks(): void {
    const listEl = document.getElementById(`js-task-list-${this.type}`)! as HTMLUListElement;
    listEl.innerHTML = '';
    for (const task of this.tasks) {
      new TaskItem(this.element.querySelector('ul')!.id, task);
    }
  }
}
