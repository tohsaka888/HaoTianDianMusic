import {useCallback, useContext} from 'react';
import {Toast} from '@ant-design/react-native';
import {MusicInfoContext} from '../context/MainContext';
import {getMusicUrl} from '../request/getMusicUrl';
import {isCollectMusic} from '../request/isCollect';
// import {UserContext} from '../context/UserContext';
import useStorge from './useStorge';

type PlayMusicFunction = (music: any) => void;

export default function usePlayMusic(): PlayMusicFunction {
  const musicProps = useContext(MusicInfoContext);
  // const userProps = useContext(UserContext);
  const storage = useStorge();
  const pushMusicRequest = useCallback(
    async music => {
      let data;
      let id = '';
      let loginStatus = await storage.load({key: 'loginStatus'});
      let isCollect: string | boolean = '';
      if ((id = music.id || musicProps?.musicInfo.id)) {
        if (loginStatus.userId) {
          isCollect = await isCollectMusic(id, loginStatus.userId);
          console.log(isCollect);
        }
        data = await getMusicUrl(id);
        // data.isCollect = isCollect;
        console.log(isCollect);
      }
      musicProps?.setMusicUrl(data);
      if (data === '') {
        Toast.fail('没有音源');
        musicProps?.setPause(true);
      } else {
        musicProps?.setPause(false);
      }
    },
    [musicProps, storage],
  );
  const playMusic = useCallback(
    (music: any) => {
      musicProps?.setMusicInfo(music);
      pushMusicRequest(music);
    },
    [musicProps, pushMusicRequest],
  );
  return playMusic;
}
