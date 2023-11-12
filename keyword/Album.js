import fetch from 'node-fetch'
export async function getAlbumData(a) {
    const apiUrl = `https://api.discogs.com/releases/${a}?token=HcVqtKhsFiqQmuwdDbpnRAfZQYjpwWRkYkAlWDxh`;
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