import { IsEnum, IsNotEmpty, IsString, Min } from 'class-validator';

export enum TaskStatus {
  Active,
  Finished,
}

export default class Task {
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
  @IsEnum(TaskStatus)
  status: TaskStatus;

  constructor(
    id: string,
    title: string,
    description: string,
    users: number,
    status: TaskStatus,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.users = users;
    this.status = status;
  }
}
