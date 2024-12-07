const db = require('../config/database');

exports.createNote = async (req, res) => {
  try {
    const { title, note } = req.body;
    const datetime = new Date();

    const [result] = await db.query('INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)', [title, datetime, note]);

    res.status(201).json({
      message: 'Note created successfully',
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const [notes] = await db.query('SELECT * FROM notes ORDER BY datetime DESC');
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const [notes] = await db.query('SELECT * FROM notes WHERE id = ?', [id]);

    if (notes.length === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json(notes[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, note } = req.body;
    const datetime = new Date();

    const [result] = await db.query('UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?', [title, datetime, note, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query('DELETE FROM notes WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
