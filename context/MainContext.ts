import {createContext, MutableRefObject} from 'react';

type ComponentProps = {
  searchValue: string;
  setSearchValue: Function;
  bannerUrls: string[];
  setBannerUrls: Function;
  visible: boolean;
  setVisible: Function;
};

type MusicInfoProps = {
  musicInfo: any;
  setMusicInfo: Function;
  musicRef: any;
  playStatus: boolean;
  setPlayStatus: Function;
  paused: boolean;
  setPaused: Function;
  currentTimeRef: MutableRefObject<number | null>;
  durationRef: MutableRefObject<number | null>;
};

const MusicInfoContext = createContext<MusicInfoProps | null>(null);

const ComponentsContext = createContext<ComponentProps | null>(null);

export {MusicInfoContext, ComponentsContext};
