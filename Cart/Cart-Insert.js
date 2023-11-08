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

const SongInsertRouter = express.Router();

SongInsertRouter.post('/', async (req, res) => {
    const { userid, info } = req.body;
    if (!userid || !info) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    try {
        console.log("카트정송");
      const conn = await pool.getConnection();
      const query = 'INSERT INTO Cart (user, info) VALUES (?,?)';
        const jsonInfo = JSON.stringify(info);
      const result = await conn.query(query, [userid, jsonInfo]);
      conn.release();
      console.log('결과',result);
      res.status(200).json({ message: 'successful' });
    } catch (error) {
      console.error('Error inserting Song:', error);
      res.status(500).json({ message: 'Error inserting comment' });
    }
});

export default SongInsertRouter;