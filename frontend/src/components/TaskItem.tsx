import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Task } from '../types';
import { taskService } from '../services/api';
import { MessageCircle, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import CommentsModal from './CommentsModal';

interface TaskItemProps {
  task: Task;
  onEditClick: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEditClick }) => {
  const [showComments, setShowComments] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(taskService.deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
      toast.success('Task deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete task');
    },
  });

  const statusMutation = useMutation(
    ({ id, status }: { id: string; status: Task['status'] }) =>
      taskService.updateTask(id, { status }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks']);
        toast.success('Task status updated');
      },
      onError: () => {
        toast.error('Failed to update task status');
      },
    }
  );

  const handleStatusChange = (newStatus: Task['status']) => {
    statusMutation.mutate({ id: task.id, status: newStatus });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteMutation.mutate(task.id);
    }
  };

  const getStatusClass = () => {
    switch (task.status) {
      case 'To Do':
        return 'task-status-todo';
      case 'In Progress':
        return 'task-status-progress';
      case 'Done':
        return 'task-status-done';
      default:
        return '';
    }
  };

  return (
    <div className={`task-item ${getStatusClass()}`}>
      <div className="flex justify-between items-start mb-md">
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <div className="flex gap-sm">
          <button
            className="btn btn-secondary"
            onClick={() => onEditClick(task)}
            title="Edit task"
          >
            <Edit size={16} />
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={deleteMutation.isLoading}
            title="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="mb-md">
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value as Task['status'])}
          className="form-select"
          disabled={statusMutation.isLoading}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      {task.tags && task.tags.length > 0 && (
        <div className="flex gap-sm mb-md flex-wrap">
          {task.tags.map((tag) => (
            <span
              key={tag.id}
              className="badge"
              style={{ backgroundColor: tag.color, color: 'white' }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-muted">
        <button
          className="flex items-center gap-sm text-muted hover:text-primary btn-link"
          onClick={() => setShowComments(true)}
          title="View comments"
        >
          <MessageCircle size={16} />
          <span>{task.commentCount || 0} comments</span>
        </button>
        <span>
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>

      <CommentsModal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        taskId={task.id}
        taskTitle={task.title}
      />
    </div>
  );
};

export default TaskItem;
