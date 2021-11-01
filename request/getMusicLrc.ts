import {baseUrl} from './baseUrl';

const getMusicLrc = async (id: string) => {
  const res = await fetch(`${baseUrl}/lyric?id=${id}`);
  const data = await res.json();
  return data.lrc.lyric;
};

export {getMusicLrc};
