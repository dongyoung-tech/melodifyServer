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
console.log("gd");
const router = express.Router();

router.post('/', async (req, res) => {
  const { user, intro, info ,name} = req.body;
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const date = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  if (!user || !info || !intro) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const conn = await pool.getConnection();
    const query = 'INSERT INTO PlayList (user,info,intro,registDay,name) VALUES (?,?,?,?,?)';
    const result = await conn.query(query, [user, JSON.stringify(info), intro, date,name]);
    conn.release();
    res.status(200).json({ message: 'successful' });
  } catch (error) {
    console.error('Error inserting comment:', error);
    res.status(500).json({ message: 'Error inserting comment' });
  }
});

export default router;