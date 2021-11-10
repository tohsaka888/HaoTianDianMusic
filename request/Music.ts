import {pythonUrl} from './baseUrl';

const getNextMusic = async (
  playlistId: number | string = '',
  musicId: number,
) => {
  const res = await fetch(`${pythonUrl}/getNextMusic/next`, {
    method: 'POST',
    body: JSON.stringify({playlistId: playlistId, musicId: musicId}),
    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
  });
  const data = await res.json();
  return data;
};

const getPreviousMusic = async (
  playlistId: number | string = '',
  musicId: number,
) => {
  const res = await fetch(`${pythonUrl}/getNextMusic/previous`, {
    method: 'POST',
    body: JSON.stringify({playlistId: playlistId, musicId: musicId}),
    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
  });
  const data = await res.json();
  return data;
};

export {getNextMusic, getPreviousMusic};
