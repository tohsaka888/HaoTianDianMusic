import {createContext} from 'react';

type AreaProps = {
  musicData: any[];
  setMusicData: Function;
  musicGroups: any[];
};

const AreaContext = createContext<AreaProps | null>(null);

export {AreaContext};
