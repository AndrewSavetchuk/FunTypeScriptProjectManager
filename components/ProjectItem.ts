import Component from './Component.js';
import Project from '../models/Project.js';
import autobind from '../decorators/autobind.js';
import { Draggable } from '../models/DragDrop.js';

export default class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project;

  get users(): string {
    if (this.project.users === 1) {
      return '1 user';
    } else {
      return `${this.project.users} users`;
    }
  }

  constructor(hostId: string, project: Project) {
    super('js-single-project', hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  configure(): void {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent(): void {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.users;
    this.element.querySelector('p')!.textContent = this.project.description;
  }

  @autobind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  @autobind
  dragEndHandler(event: DragEvent): void {
  }
}
