import {pythonUrl} from './baseUrl';
import storage from '../storage.config';

const getLovedMusic = async () => {
  let loginStatus: any = {};
  try {
    loginStatus = await storage.load({key: 'loginStatus'});
    const res = await fetch(`${pythonUrl}/getUL`, {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({userId: loginStatus.userId}),
    });
    const data = await res.json();
    if (data.success) {
      return data.result[0];
    }
  } catch (error) {
    console.log(error);
  }
};

export {getLovedMusic};
