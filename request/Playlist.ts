import {pythonUrl} from '../request/baseUrl';

const getDefaultPlaylist = async () => {
  const res = await fetch(`${pythonUrl}/getDefaultPlayList`, {
    method: 'POST',
    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
  });
  const data = await res.json();
  return data?.data;
};

export {getDefaultPlaylist};
