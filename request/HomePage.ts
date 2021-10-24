import {baseUrl} from './baseUrl';

export const getBannnerImg = async (): Promise<string[]> => {
  const res = await fetch(`${baseUrl}/banner?type=1`);
  const data = await res.json();
  let bannerUrls: string[] = [];
  if (data.banners.length) {
    data.banners.map((item: {pic: string}) => {
      bannerUrls.push(item.pic);
    });
  }
  return bannerUrls;
};
