import Project, { ProjectStatus } from '../models/Project';
import State from './State';

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance(): ProjectState {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, users: number): void {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      users,
      ProjectStatus.Active,
    );

    this.projects.push(newProject);

    this.updateListeners();
  }

  moveProject(id: string, newStatus: ProjectStatus): void {
    const project = this.projects.find((p) => p.id === id);

    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners(): void {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

export const projectState = ProjectState.getInstance();
