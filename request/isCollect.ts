import {pythonUrl} from './baseUrl';

type IsCollectFunction = (
  musicId: number | string,
  userId: number,
) => Promise<boolean>;

const isCollectMusic: IsCollectFunction = async (musicId, userId) => {
  const res = await fetch(`${pythonUrl}/getCMExist`, {
    method: 'POST',
    body: JSON.stringify({musicId: musicId, userId: userId}),
    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
  });
  const data = await res.json();
  console.log(data)
  return data.existence;
};

export {isCollectMusic};
