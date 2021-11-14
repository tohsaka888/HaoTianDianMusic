import {pythonUrl} from './baseUrl';
import storage from '../storage.config';

const getLovedMusic = async () => {
  const loginStatus = await storage.load({key: 'loginStatus'});
  const res = await fetch(`${pythonUrl}/getUL`, {
    method: 'POST',
    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify({userId: loginStatus.userId || ''}),
  });
  const data = await res.json();
  if (data.success) {
    return data.result[0];
  }
};

export {getLovedMusic};
