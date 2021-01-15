import {useEffect, useState} from 'react';

const baseUrl = 'http://media.mw.metropolia.fi/wbma/';

const useLoadMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async (limit = 5) => {
    try {
      const response = await fetch(baseUrl + 'media?limit=' + limit);
      const json = await response.json();
      console.log(json);
      const media = await Promise.all(
        json.map(async (item) => {
          const response = await fetch(baseUrl + 'media/' + item.file_id);
          const json = response.json();
          return json;
        })
      );
      console.log('media array data', media);
      setMediaArray(media);
    } catch (error) {
      console.error('loadMedia error', error);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return mediaArray;
};

export {useLoadMedia};
