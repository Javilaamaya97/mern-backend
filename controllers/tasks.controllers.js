import { pool } from "../db.js";

// Obtener todas las tareas
export const getTasks = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tasks");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener tareas" });
  }
};

// Obtener una tarea por id
export const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Tarea no encontrada" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener tarea" });
  }
};

// Crear una tarea
export const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const [result] = await pool.query("INSERT INTO tasks (title, description) VALUES (?, ?)", [title, description]);
    res.json({ id: result.insertId, title, description });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear tarea" });
  }
};

// Actualizar tarea
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    await pool.query("UPDATE tasks SET title = ?, description = ? WHERE id = ?", [title, description, id]);
    res.json({ id, title, description });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar tarea" });
  }
};

// Eliminar tarea
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM tasks WHERE id = ?", [id]);
    res.json({ message: "Tarea eliminada" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar tarea" });
  }
};

