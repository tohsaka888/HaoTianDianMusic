import {Toast} from '@ant-design/react-native';
import {useCallback, useContext} from 'react';
import {MusicInfoContext} from '../context/MainContext';
import {getNextMusic} from '../request/Music';
import usePlayMusic from './usePlayMusic';

type PlayNextMusicFunction = () => void;

export default function usePlayNextMusic(): PlayNextMusicFunction {
  const playMusic = usePlayMusic();
  const musicProps = useContext(MusicInfoContext);
  const nextMusic = useCallback(async () => {
    if (musicProps?.lyricRef) {
      musicProps.lyricRef.current = [];
      musicProps.currentIndexRef.current = 0;
    }
    const data = await getNextMusic(
      musicProps?.playlistId,
      musicProps?.musicInfo.id,
    );
    if (data.success) {
      playMusic(data?.music);
    } else {
      Toast.fail(data.errmsg);
    }
  }, [
    musicProps?.currentIndexRef,
    musicProps?.lyricRef,
    musicProps?.musicInfo.id,
    musicProps?.playlistId,
    playMusic,
  ]);
  return nextMusic;
}
