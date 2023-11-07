import fetch from 'node-fetch'
export async function getAlbums(a) {
    const apiKey = "fd21466e97d2deb5d38ef2c24e8a05b6";
    const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=tag.getTopAlbums&tag=${a}&api_key=${apiKey}&format=json&limit=4`;
    console.log(apiUrl);
    try {
      const response =await fetch(apiUrl, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
  
      return response.json(); // JSON 데이터 반환
    } catch (error) {
      console.error('에러 발생:', error);
      throw error;
    }
}