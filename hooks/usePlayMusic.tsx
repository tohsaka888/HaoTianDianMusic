import {useCallback, useContext} from 'react';
import {Toast} from '@ant-design/react-native';
import {MusicInfoContext} from '../context/MainContext';
import {getMusicUrl} from '../request/getMusicUrl';
import {isCollectMusic} from '../request/isCollect';
import {UserContext} from '../context/UserContext';

type PlayMusicFunction = (music: any) => void;

export default function usePlayMusic(): PlayMusicFunction {
  const musicProps = useContext(MusicInfoContext);
  const userProps = useContext(UserContext);
  const pushMusicRequest = useCallback(
    async music => {
      let data;
      let id = '';
      if ((id = music.id || musicProps?.musicInfo.id)) {
        if (userProps?.profile.id) {
          let isCollect = await isCollectMusic(id, userProps?.profile.id);
        }
        data = await getMusicUrl(id);
        // data.isCollect = isCollect;
        // console.log(isCollect);
      }
      musicProps?.setMusicUrl(data);
      console.log(data);
      if (data === '') {
        Toast.fail('没有音源');
        musicProps?.setPause(true);
      } else {
        musicProps?.setPause(false);
      }
    },
    [musicProps, userProps?.profile.id],
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
