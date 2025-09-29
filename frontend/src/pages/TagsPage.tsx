import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { tagService } from '../services/api';
import { Tag } from '../types';
import { Plus, Trash2 } from 'lucide-react';
import CreateTagModal from '../components/CreateTagModal';
import toast from 'react-hot-toast';

const TagsPage: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: tags = [], isLoading } = useQuery(['tags'], tagService.getTags);

  const deleteMutation = useMutation(tagService.deleteTag, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tags']);
      toast.success('Tag deleted successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to delete tag';
      toast.error(message);
    },
  });

  const handleDeleteTag = (tagId: string, tagName: string) => {
    if (window.confirm(`Are you sure you want to delete the tag "${tagName}"?`)) {
      deleteMutation.mutate(tagId);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center mt-lg">
        <p>Loading tags...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-lg">
        <h2 className="text-2xl font-bold">Tag Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={20} />
          Create New Tag
        </button>
      </div>

      {tags.length === 0 ? (
        <div className="text-center mt-lg">
          <p className="text-muted">No tags found. Create your first tag!</p>
        </div>
      ) : (
        <div className="tags-grid">
          {tags.map((tag: Tag) => (
            <div key={tag.id} className="tag-item">
              <div className="tag-header">
                <span 
                  className="tag-badge"
                  style={{ backgroundColor: tag.color, color: 'white' }}
                >
                  {tag.name}
                </span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteTag(tag.id, tag.name)}
                  disabled={deleteMutation.isLoading}
                  title="Delete tag"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="tag-details">
                <p className="text-sm text-muted">
                  Created: {new Date(tag.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateTagModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export default TagsPage;
