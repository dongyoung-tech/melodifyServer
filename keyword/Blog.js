import { response } from 'express';
import fetch from 'node-fetch'

export const getBlogData = async(a)=> {
    const apiUrl = 'https://dapi.kakao.com/v2/search/blog';
    try {
        const url = new URL(apiUrl);
        url.searchParams.append('query', a);
        url.searchParams.append('size', 4);
        url.searchParams.append('sort', 'accuracy');
    
        return fetch(url, { 
          method: 'GET',
          headers: {
            Authorization: 'KakaoAK f34a91ca9e1e99ad266cbc7e674571d2',
          },
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