import React, { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { taskService, tagService } from '../services/api';
import { CreateTaskData } from '../types';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { data: tags = [] } = useQuery({
    queryKey: ['tags'],
    queryFn: tagService.getTags,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateTaskData>();

  const createMutation = useMutation({
    mutationFn: taskService.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task created successfully');
      reset();
      setSelectedTags([]);
      onClose();
    },
    onError: () => {
      toast.error('Failed to create task');
    },
  });

  const onSubmit = (data: CreateTaskData) => {
    createMutation.mutate({
      ...data,
      tags: selectedTags.length > 0 ? selectedTags : undefined
    });
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Create New Task</h2>
          <button 
            className="btn btn-secondary modal-close"
            onClick={onClose}
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Title *</label>
              <input
                type="text"
                className={`form-input ${errors.title ? 'error' : ''}`}
                placeholder="Enter task title"
                {...register('title', { 
                  required: 'Title is required',
                  minLength: { value: 3, message: 'Title must be at least 3 characters' }
                })}
              />
              {errors.title && <div className="error-message">{errors.title.message}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Status *</label>
              <select
                className={`form-select ${errors.status ? 'error' : ''}`}
                {...register('status', { required: 'Status is required' })}
              >
                <option value="">Select status</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              {errors.status && <div className="error-message">{errors.status.message}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Tags {selectedTags.length > 0 && (
                  <span style={{ fontWeight: 400, color: 'var(--color-text-secondary)' }}>
                    ({selectedTags.length} selected)
                  </span>
                )}
              </label>
              {tags.length === 0 ? (
                <div className="tag-selector-empty">
                  No tags available. Create tags first to assign them to tasks.
                </div>
              ) : (
                <div className="tag-selector">
                  {tags.map((tag) => (
                    <label key={tag.id} className="tag-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag.id)}
                        onChange={() => handleTagToggle(tag.id)}
                        aria-label={`Toggle ${tag.name} tag`}
                      />
                      <span 
                        className="tag-label"
                        style={{ backgroundColor: tag.color }}
                      >
                        {tag.name}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
