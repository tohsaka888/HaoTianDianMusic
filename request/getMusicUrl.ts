import {baseUrl} from './baseUrl';

const getMusicUrl = async (id: string) => {
  const res = await fetch(`${baseUrl}/song/url?id=${id}`);
  const data = await res.json();
  const url = await data.data[0].url;
  return url;
};

export {getMusicUrl};
