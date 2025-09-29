import React from 'react';
import { Task } from '../types';

interface TaskStatsProps {
  tasks: Task[];
}

const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const todoCount = tasks.filter(task => task.status === 'To Do').length;
  const progressCount = tasks.filter(task => task.status === 'In Progress').length;
  const doneCount = tasks.filter(task => task.status === 'Done').length;
  const totalCount = tasks.length;

  return (
    <div className="stats-grid">
      <div className="card text-center">
        <div className="text-3xl font-bold mb-sm">{totalCount}</div>
        <div className="text-sm text-muted">Total Tasks</div>
      </div>
      <div className="card text-center">
        <div className="text-3xl font-bold mb-sm" style={{color: 'var(--color-status-todo)'}}>{todoCount}</div>
        <div className="text-sm text-muted">To Do</div>
      </div>
      <div className="card text-center">
        <div className="text-3xl font-bold mb-sm" style={{color: 'var(--color-status-progress)'}}>{progressCount}</div>
        <div className="text-sm text-muted">In Progress</div>
      </div>
      <div className="card text-center">
        <div className="text-3xl font-bold mb-sm" style={{color: 'var(--color-status-done)'}}>{doneCount}</div>
        <div className="text-sm text-muted">Done</div>
      </div>
    </div>
  );
};

export default TaskStats;
