// login.js
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

const router = Router();

router.post('/', async (req, res) => {

  const { id } = req.body;

  if (!id ) {
    return res.status(400).json({ message: 'Please provide userid' });
  }

  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM Cart WHERE user = ? order", [id]);

    conn.release();
    if (rows.length > 0) {
      return res.status(200).json({ message: 'successful' , rows:rows });
    } else {
      return res.status(200).json({ message: 'no data' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Error during login' });
  }
});

export default router;