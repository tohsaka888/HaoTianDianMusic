import {useCallback, useContext} from 'react';
import {Toast} from '@ant-design/react-native';
import {MusicInfoContext} from '../context/MainContext';
import {getMusicUrl} from '../request/getMusicUrl';

type PlayMusicFunction = (music: any) => void;

export default function usePlayMusic(): PlayMusicFunction {
  const musicProps = useContext(MusicInfoContext);
  const pushMusicRequest = useCallback(
    async music => {
      let data;
      let id = '';
      if ((id = music.id || musicProps?.musicInfo.id)) {
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
      musicProps?.setMusicInfo(music);
      pushMusicRequest(music);
    },
    [musicProps, pushMusicRequest],
  );
  return playMusic;
}
