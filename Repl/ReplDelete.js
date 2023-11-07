import { Router } from "express";
import mariadb from "mariadb";


const pool = mariadb.createPool({
  host: 'svc.sel5.cloudtype.app',
  user: 'root',
  password: 'Ehddud23!@',
  database: 'MyMusic',
  port: 30633,
  connectionLimit: 5
});

const Replrouter = Router();

Replrouter.post('/', async (req, res) => {

  const { num } = req.body;
  if (!num) {
    return res.status(400).json({ message: 'Please provide a repl number' });
  }

  try {
    const conn = await pool.getConnection();
    const result = await conn.query("DELETE  FROM Repl WHERE num=?", [num]);
    console.log(result);
    conn.release();
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Failed' });
  }
});

export default Replrouter;