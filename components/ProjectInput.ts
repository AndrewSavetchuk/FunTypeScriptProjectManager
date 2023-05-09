import Component from './Component';
import autobind from '../decorators/autobind';
import { Validatable, validate } from '../utils/validation';
import { projectState } from '../state/ProjectState';

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

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredUsers = this.usersInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
    };

    const usersValidatable: Validatable = {
      value: Number(enteredUsers),
      required: true,
      min: 1,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(usersValidatable)
    ) {
      alert('Invalid input, please try again.');
      return;
    }

    return [enteredTitle, enteredDescription, Number(enteredUsers)];
  }

  private clearInputs(): void {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.usersInputElement.value = '';
  }

  @autobind
  private submitHandler(event: Event): void {
    event.preventDefault();

    const userInput = this.gatherUserInput();

    if (Array.isArray(userInput)) {
      const [title, description, users] = userInput;
      this.clearInputs();
      projectState.addProject(title, description, users);
    }
  }
}
