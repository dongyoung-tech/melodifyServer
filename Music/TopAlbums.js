import fetch from 'node-fetch'
import { Router } from "express";
const router = Router();


router.get('/', async (req, res) => {
    const apiKey = "fd21466e97d2deb5d38ef2c24e8a05b6";
    const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=tag.getTopAlbums&tag=${req.query.cat}&api_key=${apiKey}&format=json&limit=4`;
    try {
      const response =await fetch(apiUrl, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json(); // JSON 데이터 파싱
      res.json(data); 
    } catch (error) {
      console.error('에러 발생:', error);
      throw error;
    }
});

export default router;