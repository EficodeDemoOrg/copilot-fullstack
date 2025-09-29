import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEditTask }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center mt-lg">
        <p className="text-muted">No tasks found.</p>
      </div>
    );
  }

  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onEditClick={onEditTask} />
      ))}
    </div>
  );
};

export default TaskList;
