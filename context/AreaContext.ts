import {createContext} from 'react';

type AreaProps = {
  musicData: any[];
  setMusicData: Function;
  musicGroups: any[];
  playlists: any[];
  setPlaylists: Function;
};

const AreaContext = createContext<AreaProps | null>(null);

export {AreaContext};
