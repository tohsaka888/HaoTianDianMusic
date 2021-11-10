import {pythonUrl} from './baseUrl';

const getNextMusic = async (playlistId: number, musicId: number) => {
  const res = await fetch(`${pythonUrl}/next`, {
    method: 'POST',
    body: JSON.stringify({playlistId: playlistId, musicId: musicId}),
  });
  const data = await res.json();
  return data;
};

const getPreviousMusic = async (playlistId: number, musicId: number) => {
  const res = await fetch(`${pythonUrl}/previous`, {
    method: 'POST',
    body: JSON.stringify({playlistId: playlistId, musicId: musicId}),
  });
  const data = await res.json();
  return data;
};

export {getNextMusic, getPreviousMusic};
