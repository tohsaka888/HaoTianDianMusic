import {createContext, MutableRefObject} from 'react';
import {Text} from 'react-native';

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
  pause: boolean;
  setPause: Function;
  // pauseRef: MutableRefObject<boolean>;
  // currentTimeRef: MutableRefObject<number>;
  currentTime: number;
  setCurrentTime: Function;
  durationRef: MutableRefObject<number | null>;
  musicUrl: string | null;
  setMusicUrl: Function;
  currentLrcRef: MutableRefObject<Text | undefined>;
  currentIndexRef: MutableRefObject<number>;
  lyricRef: MutableRefObject<any[]>;
  playlistId: number | string;
  setPlaylistId: Function;
};

const MusicInfoContext = createContext<MusicInfoProps | null>(null);

const ComponentsContext = createContext<ComponentProps | null>(null);

export {MusicInfoContext, ComponentsContext};
