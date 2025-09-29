export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  tags?: Tag[];
  commentCount?: number;
}

export interface Comment {
  id: string;
  taskId: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

export interface TaskFilters {
  status?: TaskStatus;
  tags?: string[];
  search?: string;
}

export interface CreateTaskData {
  title: string;
  status: TaskStatus;
  tags?: string[];
}

export interface UpdateTaskData {
  title?: string;
  status?: TaskStatus;
  tags?: string[];
}

export interface CreateCommentData {
  content: string;
  author: string;
}

export interface UpdateCommentData {
  content: string;
}

export interface CreateTagData {
  name: string;
  color: string;
}

export interface UpdateTagData {
  name?: string;
  color?: string;
}
