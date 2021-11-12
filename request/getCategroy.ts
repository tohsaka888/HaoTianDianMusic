import {baseUrl} from './baseUrl';

const getCategroy = async () => {
  const res = await fetch(`${baseUrl}/playlist/catlist`);
  const data = await res.json();
  // console.log(data.sub)
  return data.sub;
};

export {getCategroy};
