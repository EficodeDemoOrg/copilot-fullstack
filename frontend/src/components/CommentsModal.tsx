import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { commentService } from '../services/api';
import { Comment, CreateCommentData } from '../types';
import { MessageCircle, Plus, X, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  taskTitle: string;
}

const CommentsModal: React.FC<CommentsModalProps> = ({ 
  isOpen, 
  onClose, 
  taskId, 
  taskTitle 
}) => {
  const queryClient = useQueryClient();
  const [showAddForm, setShowAddForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateCommentData>();

  // Fetch comments for the task
  const { data: comments = [], isLoading } = useQuery(
    ['comments', taskId],
    () => commentService.getComments(taskId),
    { enabled: isOpen }
  );

  // Create comment mutation
  const createMutation = useMutation(commentService.createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', taskId]);
      queryClient.invalidateQueries(['tasks']);
      toast.success('Comment added successfully');
      reset();
      setShowAddForm(false);
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to add comment';
      toast.error(message);
    },
  });

  // Delete comment mutation
  const deleteMutation = useMutation(commentService.deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', taskId]);
      queryClient.invalidateQueries(['tasks']);
      toast.success('Comment deleted successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to delete comment';
      toast.error(message);
    },
  });

  const onSubmit = (data: CreateCommentData) => {
    createMutation.mutate(taskId, data);
  };

  const handleDeleteComment = (commentId: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteMutation.mutate(commentId);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content comments-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            <MessageCircle size={20} />
            Comments for "{taskTitle}"
          </h2>
          <button 
            className="btn btn-secondary modal-close"
            onClick={onClose}
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body comments-body">
          {isLoading ? (
            <div className="loading">Loading comments...</div>
          ) : (
            <>
              {comments.length === 0 ? (
                <div className="no-comments">
                  <MessageCircle size={48} className="no-comments-icon" />
                  <p>No comments yet. Be the first to add one!</p>
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
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteComment(comment.id)}
                          title="Delete comment"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="comment-content">
                        {comment.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showAddForm ? (
                <form onSubmit={handleSubmit(onSubmit)} className="add-comment-form">
                  <div className="form-group">
                    <label className="form-label">Author *</label>
                    <input
                      type="text"
                      className={`form-input ${errors.author ? 'error' : ''}`}
                      placeholder="Your name"
                      {...register('author', { 
                        required: 'Author name is required',
                        minLength: { value: 2, message: 'Author name must be at least 2 characters' },
                        maxLength: { value: 50, message: 'Author name must not exceed 50 characters' }
                      })}
                    />
                    {errors.author && (
                      <div className="error-message">{errors.author.message}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Comment *</label>
                    <textarea
                      className={`form-textarea ${errors.content ? 'error' : ''}`}
                      rows={3}
                      placeholder="Write your comment here..."
                      {...register('content', { 
                        required: 'Comment content is required',
                        minLength: { value: 5, message: 'Comment must be at least 5 characters' },
                        maxLength: { value: 1000, message: 'Comment must not exceed 1000 characters' }
                      })}
                    />
                    {errors.content && (
                      <div className="error-message">{errors.content.message}</div>
                    )}
                  </div>
                  <div className="form-actions">
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => {
                        setShowAddForm(false);
                        reset();
                      }}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={createMutation.isLoading}
                    >
                      {createMutation.isLoading ? 'Adding...' : 'Add Comment'}
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  className="btn btn-primary add-comment-btn"
                  onClick={() => setShowAddForm(true)}
                >
                  <Plus size={20} />
                  Add Comment
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;
