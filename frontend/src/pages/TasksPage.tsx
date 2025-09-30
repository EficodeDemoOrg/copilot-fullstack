import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { taskService } from '../services/api';
import { TaskStatus, Task } from '../types';
import TaskList from '../components/TaskList';
import TaskStats from '../components/TaskStats';
import TaskFilter from '../components/TaskFilter';
import CreateTaskModal from '../components/CreateTaskModal';
import EditTaskModal from '../components/EditTaskModal';
import { Plus } from 'lucide-react';

const TasksPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<TaskStatus | ''>('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Fetch all tasks for stats (unfiltered)
  const { data: allTasks = [] } = useQuery({
    queryKey: ['allTasks'],
    queryFn: () => taskService.getTasks(),
    refetchOnMount: true,
  });

  // Fetch filtered tasks for the task list
  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks', { status: statusFilter || undefined }],
    queryFn: () => taskService.getTasks({ 
      status: statusFilter || undefined
    }),
    refetchOnMount: true,
  });

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleCloseEditModal = () => {
    setEditingTask(null);
  };

  if (error) {
    return (
      <div className="text-center mt-lg">
        <p className="text-danger">Error loading tasks. Please try again.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-lg">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <button 
          className="btn btn-primary flex items-center gap-sm"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus size={16} />
          New Task
        </button>
      </div>

      <TaskStats tasks={allTasks} />
      
      <TaskFilter 
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {isLoading ? (
        <div className="text-center mt-lg">
          <div className="spinner"></div>
          <p className="mt-md">Loading tasks...</p>
        </div>
      ) : (
        <TaskList tasks={tasks} onEditTask={handleEditTask} />
      )}

      {isCreateModalOpen && (
        <CreateTaskModal 
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}

      {editingTask && (
        <EditTaskModal
          isOpen={!!editingTask}
          onClose={handleCloseEditModal}
          task={editingTask}
        />
      )}

    </div>
  );
};

export default TasksPage;
