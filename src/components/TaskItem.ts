import Component from './Component';
import Task from '../models/Task';
import autobind from '../decorators/autobind';
import { Draggable } from '../models/DragDrop';

export default class TaskItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private task: Task;

  get users(): string {
    if (this.task.users === 1) {
      return '1 user';
    } else {
      return `${this.task.users} users`;
    }
  }

  constructor(hostId: string, task: Task) {
    super('js-single-task', hostId, false, task.id);
    this.task = task;

    this.configure();
    this.renderContent();
  }

  configure(): void {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent(): void {
    this.element.querySelector('h2')!.textContent = this.task.title;
    this.element.querySelector('h3')!.textContent = this.users;
    this.element.querySelector('p')!.textContent = this.task.description;
  }

  @autobind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData('text/plain', this.task.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  @autobind
  dragEndHandler(event: DragEvent): void {
  }
}
