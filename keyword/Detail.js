import fetch from 'node-fetch';

export const getDetailInfo = async (a, b) => {
  const apiUrl = `https://api.discogs.com/${a}/${b}?token=HcVqtKhsFiqQmuwdDbpnRAfZQYjpwWRkYkAlWDxh`;
  try {
    const response = await fetch(apiUrl, {
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
};

export const getDetailAlbum = async (a, b) => {
  const apiUrl = `https://api.discogs.com/${a}/${b}/releases?token=HcVqtKhsFiqQmuwdDbpnRAfZQYjpwWRkYkAlWDxh`;
  try {
    const response = await fetch(apiUrl, {
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
};

export const getDetail = async (a, b) => {
  try {
    const info = await getDetailInfo(a, b);
    const album = await getDetailAlbum(a, b);

    return { info, album };
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
};
