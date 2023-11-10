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

const SongRouter = express.Router();

SongRouter.post('/', async (req, res) => {
  const {name} = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const conn = await pool.getConnection();
    const query = "DELETE  FROM PlayList WHERE name=?"
    const result = await conn.query(query, [name]);
    conn.release();
    res.status(200).json({ message: 'successful' });
  } catch (error) {
    console.error('Error inserting Song:', error);
    res.status(500).json({ message: 'Error inserting comment' });
  }
});

export default SongRouter;