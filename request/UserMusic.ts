import {pythonUrl} from './baseUrl';

const getUserPlaylist = async (userId: string = '') => {
  const res = await fetch(`${pythonUrl}/getRecomendP`, {
    method: 'POST',
    body: JSON.stringify({userId: userId}),
    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
  });
  const data = await res.json();
  return data?.result;
};

const getUserMusic = async (userId: string = '') => {
  const res = await fetch(`${pythonUrl}/getRecomendM`, {
    method: 'POST',
    body: JSON.stringify({userId: userId}),
    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
  });
  const data = await res.json();
  return data?.result;
};

export {getUserPlaylist, getUserMusic};
