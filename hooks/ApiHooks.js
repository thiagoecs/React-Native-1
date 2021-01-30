import {useEffect, useState} from 'react';
import {baseUrl} from '../utils/variables';

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

const useLogin = () => {
  const postLogin = async (userCrentials) => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userCrentials),
    };
    try {
      const response = await fetch(baseUrl + 'login', options);
      const userData = await response.json();
      console.log('postLogin reponse status', response.status);
      console.log('postLogin userData', userData);
      if (response.ok) {
        return userData;
      } else {
        throw new Error(userData.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {postLogin};
};

const useUser = () => {
  const postRegister = async (inputs) => {
    console.log('trying to create user', inputs);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      const response = await fetch(baseUrl + 'users', fetchOptions);
      const json = await response.json();
      console.log('register resp', json);
      if (response.ok) {
        return json;
      } else {
        throw new Error(json.message + ': ' + json.error);
      }
    } catch (e) {
      console.log('ApiHooks register', e.message);
      throw new Error(e.message);
    }
  };
  const checkToken = async (token) => {
    try {
      const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };
      const response = await fetch(baseUrl + 'users/user', options);
      const userData = response.json();
      if (response.ok) {
        return userData;
      } else {
        throw new Error(userData.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return {postRegister, checkToken};
};

export {useLoadMedia, useLogin, useUser};
