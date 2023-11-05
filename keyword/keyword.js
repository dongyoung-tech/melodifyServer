import fetch from 'node-fetch'

export function getKeywordData(a,b) {
    const api_key=`HcVqtKhsFiqQmuwdDbpnRAfZQYjpwWRkYkAlWDxh`;
    const apiUrl =`https://api.discogs.com/database/search?q=${a}&type=${b}&token=${api_key}`;
    
    try {
        return fetch(apiUrl, { 
          method: 'GET',
        })
        .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok.');
            }
            return response.json(); // XML 데이터 획득
          });
    
    
        // 여기에서 데이터를 처리하거나 상태를 업데이트할 수 있습니다.
      } catch (error) {
        console.error('에러 발생:', error);
      }
}