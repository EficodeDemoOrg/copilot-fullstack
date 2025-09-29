import express from 'express';
import { pool } from '../database/connection';
import { Tag, CreateTagData, UpdateTagData } from '../types';

const router = express.Router();

// GET /api/tags - Get all tags
router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const query = 'SELECT id, name, color, created_at FROM tags ORDER BY name ASC';
    const result = await pool.query(query);
    
    const tags = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      color: row.color,
      createdAt: row.created_at
    }));
    
    res.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

// GET /api/tags/:id - Get single tag
router.get('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    
    const query = 'SELECT id, name, color, created_at FROM tags WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    
    const row = result.rows[0];
    const tag = {
      id: row.id,
      name: row.name,
      color: row.color,
      createdAt: row.created_at
    };
    
    res.json(tag);
  } catch (error) {
    console.error('Error fetching tag:', error);
    res.status(500).json({ error: 'Failed to fetch tag' });
  }
});

// POST /api/tags - Create new tag
router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const { name, color }: CreateTagData = req.body;
    
    if (!name || !color) {
      return res.status(400).json({ error: 'Name and color are required' });
    }
    
    // Check if tag name already exists
    const existingTag = await pool.query('SELECT id FROM tags WHERE name = $1', [name]);
    if (existingTag.rows.length > 0) {
      return res.status(400).json({ error: 'Tag name already exists' });
    }
    
    const result = await pool.query(
      'INSERT INTO tags (name, color) VALUES ($1, $2) RETURNING *',
      [name, color]
    );
    
    const newTag = result.rows[0];
    const tag = {
      id: newTag.id,
      name: newTag.name,
      color: newTag.color,
      createdAt: newTag.created_at
    };
    
    res.status(201).json(tag);
  } catch (error) {
    console.error('Error creating tag:', error);
    res.status(500).json({ error: 'Failed to create tag' });
  }
});

// PUT /api/tags/:id - Update tag
router.put('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { name, color }: UpdateTagData = req.body;
    
    const updateFields: string[] = [];
    const updateValues: any[] = [];
    let paramCount = 1;
    
    if (name !== undefined) {
      // Check if new name already exists (excluding current tag)
      const existingTag = await pool.query('SELECT id FROM tags WHERE name = $1 AND id != $2', [name, id]);
      if (existingTag.rows.length > 0) {
        return res.status(400).json({ error: 'Tag name already exists' });
      }
      
      updateFields.push(`name = $${paramCount++}`);
      updateValues.push(name);
    }
    
    if (color !== undefined) {
      updateFields.push(`color = $${paramCount++}`);
      updateValues.push(color);
    }
    
    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    
    updateValues.push(id);
    
    const updateQuery = `UPDATE tags SET ${updateFields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
    const result = await pool.query(updateQuery, updateValues);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    
    const updatedTag = result.rows[0];
    const tag = {
      id: updatedTag.id,
      name: updatedTag.name,
      color: updatedTag.color,
      createdAt: updatedTag.created_at
    };
    
    res.json(tag);
  } catch (error) {
    console.error('Error updating tag:', error);
    res.status(500).json({ error: 'Failed to update tag' });
  }
});

// DELETE /api/tags/:id - Delete tag
router.delete('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM tags WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    
    res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    console.error('Error deleting tag:', error);
    res.status(500).json({ error: 'Failed to delete tag' });
  }
});

export default router;
