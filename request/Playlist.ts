import {pythonUrl} from '../request/baseUrl';

const getDefaultPlaylist = async () => {
  const res = await fetch(`${pythonUrl}/getDefaultPlayList`, {method: 'POST'});
  const data = await res.json();
  return data?.result;
};

export {getDefaultPlaylist};
