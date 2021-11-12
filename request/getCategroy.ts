import {baseUrl} from './baseUrl';

const getCategroy = async () => {
  const res = await fetch(`${baseUrl}/playlist/catlist`);
  const data = await res.json();
  return data.sub;
};

export {getCategroy};
