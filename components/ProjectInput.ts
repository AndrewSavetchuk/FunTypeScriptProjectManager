import Component from './Component';
import Project, { ProjectStatus } from '../models/Project';
import autobind from '../decorators/autobind';
import { projectState } from '../state/ProjectState';
import { validate, ValidationError } from 'class-validator';

export default class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  usersInputElement: HTMLInputElement;

  constructor() {
    super('js-project-input', 'app', true);
    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.usersInputElement = this.element.querySelector('#users') as HTMLInputElement;
    this.configure();
  }

  configure(): void {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent(): void {
  }

  private clearInputs(): void {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.usersInputElement.value = '';
  }

  private formatErrorMessage(error: ValidationError): string {
    if (error.constraints) {
      const errorMessage = Object.values(error.constraints).join(', ');
      return `${errorMessage.charAt(0).toUpperCase()}${errorMessage.slice(1)}.`;
    }
    return '';
  }

  @autobind
  private async submitHandler(event: Event): Promise<void> {
    event.preventDefault();

    const id = Math.random().toString();
    const title = this.titleInputElement.value;
    const description = this.descriptionInputElement.value;
    const users = Number(this.usersInputElement.value);
    const status = ProjectStatus.Active;

    const project = new Project(id, title, description, users, status);
    const errors = await validate(project);

    if (errors.length > 0) {
      const errorMessages = errors.map(this.formatErrorMessage).join('\n');
      alert(`Validation failed:\n${errorMessages}`);
    } else {
      projectState.addProject(project);
      this.clearInputs();
    }
  }
}
