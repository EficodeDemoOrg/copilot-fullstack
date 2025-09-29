import React from 'react';
import { TaskStatus } from '../types';

interface TaskFilterProps {
  statusFilter: TaskStatus | '';
  onStatusChange: (status: TaskStatus | '') => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  statusFilter,
  onStatusChange,
}) => {
  const statusOptions: Array<{ value: TaskStatus | '', label: string }> = [
    { value: '', label: 'All' },
    { value: 'To Do', label: 'To Do' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Done', label: 'Done' },
  ];

  return (
    <div className="card mb-lg">
      <div className="text-center">
        <div className="flex gap-sm flex-wrap justify-center">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              className={`btn ${
                statusFilter === option.value ? 'btn-primary' : 'btn-secondary'
              }`}
              onClick={() => onStatusChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
