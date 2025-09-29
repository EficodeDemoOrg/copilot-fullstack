import express from 'express';
import { pool } from '../database/connection';
import { Comment, CreateCommentData, UpdateCommentData } from '../types';

const router = express.Router();

// GET /api/comments/:taskId - Get comments for a task
router.get('/:taskId', async (req: express.Request, res: express.Response) => {
  try {
    const { taskId } = req.params;
    
    const query = `
      SELECT id, task_id, content, author, created_at, updated_at
      FROM comments 
      WHERE task_id = $1 
      ORDER BY created_at ASC
    `;
    
    const result = await pool.query(query, [taskId]);
    
    const comments = result.rows.map(row => ({
      id: row.id,
      taskId: row.task_id,
      content: row.content,
      author: row.author,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
    
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// POST /api/comments/:taskId - Add comment to task
router.post('/:taskId', async (req: express.Request, res: express.Response) => {
  try {
    const { taskId } = req.params;
    const { content, author }: CreateCommentData = req.body;
    
    if (!content || !author) {
      return res.status(400).json({ error: 'Content and author are required' });
    }
    
    // Check if task exists
    const taskCheck = await pool.query('SELECT id FROM tasks WHERE id = $1', [taskId]);
    if (taskCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    const result = await pool.query(
      'INSERT INTO comments (task_id, content, author) VALUES ($1, $2, $3) RETURNING *',
      [taskId, content, author]
    );
    
    const newComment = result.rows[0];
    const comment = {
      id: newComment.id,
      taskId: newComment.task_id,
      content: newComment.content,
      author: newComment.author,
      createdAt: newComment.created_at,
      updatedAt: newComment.updated_at
    };
    
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

// PUT /api/comments/:id - Update comment
router.put('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { content }: UpdateCommentData = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    
    const result = await pool.query(
      'UPDATE comments SET content = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [content, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    const updatedComment = result.rows[0];
    const comment = {
      id: updatedComment.id,
      taskId: updatedComment.task_id,
      content: updatedComment.content,
      author: updatedComment.author,
      createdAt: updatedComment.created_at,
      updatedAt: updatedComment.updated_at
    };
    
    res.json(comment);
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ error: 'Failed to update comment' });
  }
});

// DELETE /api/comments/:id - Delete comment
router.delete('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM comments WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

export default router;
