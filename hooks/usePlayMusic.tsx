import {useCallback, useContext} from 'react';
import {Toast} from '@ant-design/react-native';
import {MusicInfoContext} from '../context/MainContext';
import {getMusicUrl} from '../request/getMusicUrl';
import {isCollectMusic} from '../request/isCollect';
// import {UserContext} from '../context/UserContext';
import storage from '../storage.config';

type PlayMusicFunction = (music: any) => void;

export default function usePlayMusic(): PlayMusicFunction {
  const musicProps = useContext(MusicInfoContext);
  // const userProps = useContext(UserContext);
  const pushMusicRequest = useCallback(
    async music => {
      let data;
      let id = '';
      let loginStatus: any = {};
      try {
        loginStatus = await storage.load({key: 'loginStatus'});
      } catch (error) {
        loginStatus.userId = '';
      }
      let isCollect: string | boolean = '';
      if ((id = music.id || musicProps?.musicInfo.id)) {
        if (loginStatus.userId && musicProps?.musicInfo) {
          isCollect = await isCollectMusic(id, loginStatus.userId);
          music.isCollect = isCollect;
        }
        musicProps?.setMusicInfo(music);
        data = await getMusicUrl(id);
      }
      musicProps?.setMusicUrl(data);
      if (data === '') {
        Toast.fail('没有音源');
        musicProps?.setPause(true);
      } else {
        musicProps?.setPause(false);
      }
    },
    [musicProps],
  );
  const playMusic = useCallback(
    (music: any) => {
      pushMusicRequest(music);
    },
    [pushMusicRequest],
  );
  return playMusic;
}
