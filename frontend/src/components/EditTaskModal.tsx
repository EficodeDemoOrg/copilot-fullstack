import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { taskService, tagService, commentService } from '../services/api';
import { Task, UpdateTaskData, Tag, Comment, CreateCommentData } from '../types';
import { X, MessageCircle, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, onClose, task }) => {
  if (!task) return null;
  const queryClient = useQueryClient();
  const [selectedTags, setSelectedTags] = useState<string[]>(
    task.tags?.map(tag => tag.id) || []
  );
  const [showAddComment, setShowAddComment] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UpdateTaskData>({
    defaultValues: {
      title: task.title,
      status: task.status
    }
  });

  // Comment form
  const {
    register: registerComment,
    handleSubmit: handleCommentSubmit,
    reset: resetComment,
    formState: { errors: commentErrors }
  } = useForm<CreateCommentData>();

  // Fetch available tags
  const { data: availableTags = [] } = useQuery(['tags'], tagService.getTags);
  
  // Fetch comments for this task
  const { data: comments = [], isLoading: commentsLoading } = useQuery(
    ['comments', task.id],
    () => commentService.getComments(task.id),
    { enabled: isOpen }
  );

  // Update task mutation
  const updateMutation = useMutation(
    (data: UpdateTaskData) => taskService.updateTask(task.id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks']);
        toast.success('Task updated successfully');
        onClose();
      },
      onError: (error: any) => {
        const message = error.response?.data?.error || 'Failed to update task';
        toast.error(message);
      },
    }
  );

  // Create comment mutation
  const createCommentMutation = useMutation(
    (data: CreateCommentData) => commentService.createComment(task.id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', task.id]);
        queryClient.invalidateQueries(['tasks']);
        toast.success('Comment added successfully');
        resetComment();
        setShowAddComment(false);
      },
      onError: (error: any) => {
        const message = error.response?.data?.error || 'Failed to add comment';
        toast.error(message);
      },
    }
  );

  // Delete comment mutation
  const deleteCommentMutation = useMutation(commentService.deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', task.id]);
      queryClient.invalidateQueries(['tasks']);
      toast.success('Comment deleted successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to delete comment';
      toast.error(message);
    },
  });

  const onSubmit = (data: UpdateTaskData) => {
    updateMutation.mutate({
      ...data,
      tags: selectedTags
    });
  };

  const onCommentSubmit = (data: CreateCommentData) => {
    createCommentMutation.mutate(data);
  };

  const handleDeleteComment = (commentId: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteCommentMutation.mutate(commentId);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleTagChange = (tagId: string, checked: boolean) => {
    if (checked) {
      setSelectedTags(prev => [...prev, tagId]);
    } else {
      setSelectedTags(prev => prev.filter(id => id !== tagId));
    }
  };

  const handleClose = () => {
    onClose();
  };

  React.useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      reset({
        title: task.title,
        status: task.status
      });
      setSelectedTags(task.tags?.map(tag => tag.id) || []);
    }
  }, [isOpen, task, reset]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
  <div className="modal-content edit-task-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Edit Task</h2>
          <button 
            className="btn btn-secondary modal-close"
            onClick={handleClose}
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Task Title *</label>
              <input
                type="text"
                className={`form-input ${errors.title ? 'error' : ''}`}
                placeholder="Enter task title"
                {...register('title', { 
                  required: 'Task title is required',
                  minLength: { value: 3, message: 'Title must be at least 3 characters' },
                  maxLength: { value: 100, message: 'Title must not exceed 100 characters' }
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
              {availableTags.length === 0 ? (
                <div className="tag-selector-empty">
                  No tags available. Create tags first to assign them to tasks.
                </div>
              ) : (
                <div className="tag-selector">
                  {availableTags.map((tag: Tag) => (
                    <label key={tag.id} className="tag-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag.id)}
                        onChange={(e) => handleTagChange(tag.id, e.target.checked)}
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

            <div className="form-group">
              <label className="form-label">Task Details</label>
              <div className="task-details-summary">
                <p><strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}</p>
                <p><strong>Last Updated:</strong> {new Date(task.updatedAt).toLocaleString()}</p>
                <p><strong>Comments:</strong> {task.commentCount || 0}</p>
              </div>
            </div>

            {/* Comments Section */}
            <div className="form-group">
              <div className="comments-section-header">
                <label className="form-label">
                  <MessageCircle size={16} />
                  Comments ({comments.length})
                </label>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowAddComment(!showAddComment)}
                >
                  <Plus size={14} />
                  {showAddComment ? 'Cancel' : 'Add Comment'}
                </button>
              </div>

              {/* Add Comment Form */}
              {showAddComment && (
                <div className="add-comment-section">
                  <div className="form-group">
                    <input
                      type="text"
                      className={`form-input ${commentErrors.author ? 'error' : ''}`}
                      placeholder="Your name"
                      {...registerComment('author', { 
                        required: 'Author name is required',
                        minLength: { value: 2, message: 'Author name must be at least 2 characters' },
                        maxLength: { value: 50, message: 'Author name must not exceed 50 characters' }
                      })}
                    />
                    {commentErrors.author && (
                      <div className="error-message">{commentErrors.author.message}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <textarea
                      className={`form-textarea ${commentErrors.content ? 'error' : ''}`}
                      rows={3}
                      placeholder="Write your comment here..."
                      {...registerComment('content', { 
                        required: 'Comment content is required',
                        minLength: { value: 5, message: 'Comment must be at least 5 characters' },
                        maxLength: { value: 1000, message: 'Comment must not exceed 1000 characters' }
                      })}
                    />
                    {commentErrors.content && (
                      <div className="error-message">{commentErrors.content.message}</div>
                    )}
                  </div>
                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setShowAddComment(false);
                        resetComment();
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      disabled={createCommentMutation.isLoading}
                      onClick={handleCommentSubmit(onCommentSubmit)}
                    >
                      {createCommentMutation.isLoading ? 'Adding...' : 'Add Comment'}
                    </button>
                  </div>
                </div>
              )}

              {/* Comments List */}
              <div className="comments-list-section">
                {commentsLoading ? (
                  <div className="loading">Loading comments...</div>
                ) : comments.length === 0 ? (
                  <div className="no-comments">
                    <p>No comments yet.</p>
                  </div>
                ) : (
                  <div className="comments-list">
                    {comments.map((comment: Comment) => (
                      <div key={comment.id} className="comment-item">
                        <div className="comment-header">
                          <div className="comment-meta">
                            <span className="comment-author">{comment.author}</span>
                            <span className="comment-date">
                              {formatDate(comment.createdAt)}
                            </span>
                          </div>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteComment(comment.id)}
                            title="Delete comment"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                        <div className="comment-content">
                          {comment.content}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={updateMutation.isLoading}
            >
              {updateMutation.isLoading ? 'Updating...' : 'Update Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
