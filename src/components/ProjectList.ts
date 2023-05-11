import Component from './Component';
import Project, { ProjectStatus } from '../models/Project';
import ProjectItem from './ProjectItem';
import autobind from '../decorators/autobind';
import { DragTarget } from '../models/DragDrop';
import { projectState } from '../state/ProjectState';

export default class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
  projects: Project[];

  constructor(private type: 'active' | 'finished') {
    super('js-project-list', 'app', false, `${type}-projects`);
    this.projects = [];

    this.configure();
    this.renderContent();
  }

  configure(): void {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);

    projectState.addListener((projects: Project[]) => {
      this.projects = projects.filter((prj: Project) => {
        return prj.status === (this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
      });
      this.renderProjects();
    });
  }

  renderContent(): void {
    this.element.querySelector('ul')!.id = `js-project-list-${this.type}`;
    this.element.querySelector('h2')!.textContent = `${this.type.toUpperCase()} PROJECTS`;
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

    const projectId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(projectId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    this.element.querySelector('ul')!.classList.remove('droppable');
  }

  private renderProjects(): void {
    const listEl = document.getElementById(`js-project-list-${this.type}`)! as HTMLUListElement;
    listEl.innerHTML = '';
    for (const project of this.projects) {
      new ProjectItem(this.element.querySelector('ul')!.id, project);
    }
  }
}
