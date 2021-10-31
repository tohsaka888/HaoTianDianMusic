import React, {createContext} from 'react';

type ComponentProps = {
  searchValue: string;
  setSearchValue: Function;
  bannerUrls: string[];
  setBannerUrls: Function;
};

type MusicInfoProps = {
  musicInfo: any;
  setMusicInfo: Function;
  musicRef: any;
  playStatus: boolean;
  setPlayStatus: Function;
};

const MusicInfoContext = createContext<MusicInfoProps | null>(null);

const ComponentsContext = createContext<ComponentProps | null>(null);

export {MusicInfoContext, ComponentsContext};
