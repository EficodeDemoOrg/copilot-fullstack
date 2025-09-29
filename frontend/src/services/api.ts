import axios from 'axios';
import { Task, Comment, Tag, CreateTaskData, UpdateTaskData, CreateCommentData, UpdateCommentData, CreateTagData, UpdateTagData, TaskFilters } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Task API
export const taskService = {
  getTasks: async (filters?: TaskFilters): Promise<Task[]> => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.tags) filters.tags.forEach(tag => params.append('tags', tag));
    
    const response = await api.get(`/tasks?${params.toString()}`);
    return response.data;
  },

  getTask: async (id: string): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (data: CreateTaskData): Promise<Task> => {
    const response = await api.post('/tasks', data);
    return response.data;
  },

  updateTask: async (id: string, data: UpdateTaskData): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};

// Comment API
export const commentService = {
  getComments: async (taskId: string): Promise<Comment[]> => {
    const response = await api.get(`/comments/${taskId}`);
    return response.data;
  },

  createComment: async (taskId: string, data: CreateCommentData): Promise<Comment> => {
    const response = await api.post(`/comments/${taskId}`, data);
    return response.data;
  },

  updateComment: async (id: string, data: UpdateCommentData): Promise<Comment> => {
    const response = await api.put(`/comments/${id}`, data);
    return response.data;
  },

  deleteComment: async (id: string): Promise<void> => {
    await api.delete(`/comments/${id}`);
  },
};

// Tag API
export const tagService = {
  getTags: async (): Promise<Tag[]> => {
    const response = await api.get('/tags');
    return response.data;
  },

  getTag: async (id: string): Promise<Tag> => {
    const response = await api.get(`/tags/${id}`);
    return response.data;
  },

  createTag: async (data: CreateTagData): Promise<Tag> => {
    const response = await api.post('/tags', data);
    return response.data;
  },

  updateTag: async (id: string, data: UpdateTagData): Promise<Tag> => {
    const response = await api.put(`/tags/${id}`, data);
    return response.data;
  },

  deleteTag: async (id: string): Promise<void> => {
    await api.delete(`/tags/${id}`);
  },
};
