import { IsEnum, IsNotEmpty, IsString, Min } from 'class-validator';

export enum ProjectStatus {
  Active,
  Finished,
}

export default class Project {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @Min(1)
  users: number;

  @IsNotEmpty()
  @IsEnum(ProjectStatus)
  status: ProjectStatus;

  constructor(
    id: string,
    title: string,
    description: string,
    users: number,
    status: ProjectStatus,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.users = users;
    this.status = status;
  }
}
