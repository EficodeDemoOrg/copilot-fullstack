import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { tagService } from '../services/api';
import { CreateTagData } from '../types';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface CreateTagModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTagModal: React.FC<CreateTagModalProps> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const [selectedColor, setSelectedColor] = useState('#007bff');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateTagData>({
    defaultValues: {
      color: '#007bff'
    }
  });

  const createMutation = useMutation({
    mutationFn: tagService.createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      toast.success('Tag created successfully');
      reset();
      setSelectedColor('#007bff');
      onClose();
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to create tag';
      toast.error(message);
    },
  });

  const onSubmit = (data: CreateTagData) => {
    createMutation.mutate({
      ...data,
      color: selectedColor
    });
  };

  const colorOptions = [
    '#dc3545', // Red - Important
    '#fd7e14', // Orange - Bug
    '#28a745', // Green - Feature
    '#6f42c1', // Purple - Documentation
    '#007bff', // Blue - Default
    '#20c997', // Teal
    '#ffc107', // Yellow
    '#6c757d', // Gray
  ];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Create New Tag</h2>
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
              <label className="form-label">Tag Name *</label>
              <input
                type="text"
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Enter tag name"
                {...register('name', { 
                  required: 'Tag name is required',
                  minLength: { value: 2, message: 'Tag name must be at least 2 characters' },
                  maxLength: { value: 50, message: 'Tag name must not exceed 50 characters' }
                })}
              />
              {errors.name && <div className="error-message">{errors.name.message}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Color *</label>
              <div className="color-selector">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    title={`Select ${color}`}
                  />
                ))}
              </div>
              <input
                type="color"
                className="form-input color-input"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              />
              <div className="color-preview">
                <span 
                  className="tag-preview"
                  style={{ backgroundColor: selectedColor }}
                >
                  Preview
                </span>
              </div>
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
              {createMutation.isPending ? 'Creating...' : 'Create Tag'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTagModal;
