import express from 'express';
import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: 'svc.sel5.cloudtype.app',
    user: 'root',
    password: 'Ehddud23!@',
    database: 'MyMusic',
    port: 30633,
    connectionLimit: 5 
  });

const commentRouter = express.Router();

commentRouter.post('/', async (req, res) => {
  const { id, name, content,  parent , category ,profile} = req.body;
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const date = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  if (!id || !name || !content || !category || !parent) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const conn = await pool.getConnection();
    const query = 'INSERT INTO Repl (id, name, content,  parent , category , profile,date) VALUES (?,?, ?, ? , ?, ?,?)';
    const result = await conn.query(query, [id, name, content, parent ,category,profile,date]);
    conn.release();
    console.log(result);
    res.status(200).json({ message: 'Comment inserted successfully' });
  } catch (error) {
    console.error('Error inserting comment:', error);
    res.status(500).json({ message: 'Error inserting comment' });
  }
});

export default commentRouter;