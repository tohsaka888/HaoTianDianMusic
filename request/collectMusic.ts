import {pythonUrl} from './baseUrl';

const collectMusic = async (
  musicId: number,
  userId: number,
  tags: Array<string>,
) => {
  const res = await fetch(`${pythonUrl}/collectMusic`, {
    method: 'POST',
    body: JSON.stringify({musicId: musicId, userId: userId, tags: tags}),
    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
  });
  const data = await res.json();
  return data;
};

export {collectMusic};
