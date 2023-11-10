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
  const { userid,  info} = req.body;
  console.log("업뎃",req.body)
  const jsonInfo = JSON.stringify(info);
  if (!userid ||  !info) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const conn = await pool.getConnection();
    let query='';
    let result ='';
    if(info.length == 0){
      query = "DELETE  FROM Cart WHERE user=?"
      result = await conn.query(query, [userid]);
    }
    else {
      query = "Update Cart SET info = ? WHERE user = ?";
      result = await conn.query(query, [jsonInfo,userid]);
    }
    conn.release();
    res.status(200).json({ message: 'successful' });
  } catch (error) {
    console.error('Error inserting Song:', error);
    res.status(500).json({ message: 'Error inserting comment' });
  }
});

export default SongRouter;