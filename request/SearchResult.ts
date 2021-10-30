import {pythonUrl} from './baseUrl';

export const getMusicByName = async (musicName: string, page: number = 1) => {
  const res = await fetch(`${pythonUrl}` + '/getMusicByName', {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({musicName: musicName, page: page}),
    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
  });
  const data = await res.json();
  return data;
};
