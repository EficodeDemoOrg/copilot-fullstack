import express from 'express';
import { pool } from '../database/connection';
import { Task, TaskFilters, CreateTaskData, UpdateTaskData } from '../types';

const router = express.Router();

// GET /api/tasks - Get all tasks with optional filtering
router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const { status, tags, search } = req.query as any;
    
    let query = `
      SELECT 
        t.id, t.title, t.status, t.created_at, t.updated_at,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT('id', tg.id, 'name', tg.name, 'color', tg.color, 'createdAt', tg.created_at)
          ) FILTER (WHERE tg.id IS NOT NULL), 
          '[]'
        ) as tags,
        (SELECT COUNT(*) FROM comments c WHERE c.task_id = t.id) as comment_count
      FROM tasks t
      LEFT JOIN task_tags tt ON t.id = tt.task_id
      LEFT JOIN tags tg ON tt.tag_id = tg.id
    `;
    
    const conditions: string[] = [];
    const values: any[] = [];
    
    if (status) {
      conditions.push(`t.status = $${values.length + 1}`);
      values.push(status);
    }
    
    if (search) {
      conditions.push(`t.title ILIKE $${values.length + 1}`);
      values.push(`%${search}%`);
    }
    
    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }
    
    query += ' GROUP BY t.id, t.title, t.status, t.created_at, t.updated_at ORDER BY t.created_at DESC';
    
    const result = await pool.query(query, values);
    
    const tasks = result.rows.map(row => ({
      id: row.id,
      title: row.title,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      tags: row.tags,
      commentCount: parseInt(row.comment_count)
    }));
    
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// GET /api/tasks/:id - Get single task
router.get('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT 
        t.id, t.title, t.status, t.created_at, t.updated_at,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT('id', tg.id, 'name', tg.name, 'color', tg.color, 'createdAt', tg.created_at)
          ) FILTER (WHERE tg.id IS NOT NULL), 
          '[]'
        ) as tags,
        (SELECT COUNT(*) FROM comments c WHERE c.task_id = t.id) as comment_count
      FROM tasks t
      LEFT JOIN task_tags tt ON t.id = tt.task_id
      LEFT JOIN tags tg ON tt.tag_id = tg.id
      WHERE t.id = $1
      GROUP BY t.id, t.title, t.status, t.created_at, t.updated_at
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    const row = result.rows[0];
    const task = {
      id: row.id,
      title: row.title,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      tags: row.tags,
      commentCount: parseInt(row.comment_count)
    };
    
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// POST /api/tasks - Create new task
router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const { title, status, tags }: CreateTaskData = req.body;
    
    if (!title || !status) {
      return res.status(400).json({ error: 'Title and status are required' });
    }
    
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Insert task
      const taskResult = await client.query(
        'INSERT INTO tasks (title, status) VALUES ($1, $2) RETURNING *',
        [title, status]
      );
      
      const newTask = taskResult.rows[0];
      
      // Add tags if provided
      if (tags && tags.length > 0) {
        for (const tagId of tags) {
          await client.query(
            'INSERT INTO task_tags (task_id, tag_id) VALUES ($1, $2)',
            [newTask.id, tagId]
          );
        }
      }
      
      await client.query('COMMIT');
      
      // Fetch the complete task with tags
      const completeTaskQuery = `
        SELECT 
          t.id, t.title, t.status, t.created_at, t.updated_at,
          COALESCE(
            JSON_AGG(
              JSON_BUILD_OBJECT('id', tg.id, 'name', tg.name, 'color', tg.color, 'createdAt', tg.created_at)
            ) FILTER (WHERE tg.id IS NOT NULL), 
            '[]'
          ) as tags,
          (SELECT COUNT(*) FROM comments c WHERE c.task_id = t.id) as comment_count
        FROM tasks t
        LEFT JOIN task_tags tt ON t.id = tt.task_id
        LEFT JOIN tags tg ON tt.tag_id = tg.id
        WHERE t.id = $1
        GROUP BY t.id, t.title, t.status, t.created_at, t.updated_at
      `;
      
      const completeTaskResult = await client.query(completeTaskQuery, [newTask.id]);
      const row = completeTaskResult.rows[0];
      
      const task = {
        id: row.id,
        title: row.title,
        status: row.status,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        tags: row.tags,
        commentCount: parseInt(row.comment_count)
      };
      
      res.status(201).json(task);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT /api/tasks/:id - Update task
router.put('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { title, status, tags }: UpdateTaskData = req.body;
    
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Update task
      const updateFields: string[] = [];
      const updateValues: any[] = [];
      let paramCount = 1;
      
      if (title !== undefined) {
        updateFields.push(`title = $${paramCount++}`);
        updateValues.push(title);
      }
      
      if (status !== undefined) {
        updateFields.push(`status = $${paramCount++}`);
        updateValues.push(status);
      }
      
      updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
      updateValues.push(id);
      
      if (updateFields.length > 1) { // More than just updated_at
        const updateQuery = `UPDATE tasks SET ${updateFields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
        await client.query(updateQuery, updateValues);
      }
      
      // Update tags if provided
      if (tags !== undefined) {
        // Remove existing tags
        await client.query('DELETE FROM task_tags WHERE task_id = $1', [id]);
        
        // Add new tags
        for (const tagId of tags) {
          await client.query(
            'INSERT INTO task_tags (task_id, tag_id) VALUES ($1, $2)',
            [id, tagId]
          );
        }
      }
      
      await client.query('COMMIT');
      
      // Fetch updated task
      const query = `
        SELECT 
          t.id, t.title, t.status, t.created_at, t.updated_at,
          COALESCE(
            JSON_AGG(
              JSON_BUILD_OBJECT('id', tg.id, 'name', tg.name, 'color', tg.color, 'createdAt', tg.created_at)
            ) FILTER (WHERE tg.id IS NOT NULL), 
            '[]'
          ) as tags,
          (SELECT COUNT(*) FROM comments c WHERE c.task_id = t.id) as comment_count
        FROM tasks t
        LEFT JOIN task_tags tt ON t.id = tt.task_id
        LEFT JOIN tags tg ON tt.tag_id = tg.id
        WHERE t.id = $1
        GROUP BY t.id, t.title, t.status, t.created_at, t.updated_at
      `;
      
      const result = await client.query(query, [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }
      
      const row = result.rows[0];
      const task = {
        id: row.id,
        title: row.title,
        status: row.status,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        tags: row.tags,
        commentCount: parseInt(row.comment_count)
      };
      
      res.json(task);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

export default router;
