import {Toast} from '@ant-design/react-native';
import {useCallback, useContext} from 'react';
import {MusicInfoContext} from '../context/MainContext';
import {getPreviousMusic} from '../request/Music';
import usePlayMusic from './usePlayMusic';

type PlayPreviousMusicFunction = () => void;

export default function usePlayPreviousMusic(): PlayPreviousMusicFunction {
  const playMusic = usePlayMusic();
  const musicProps = useContext(MusicInfoContext);
  const nextMusic = useCallback(async () => {
    if (musicProps?.lyricRef) {
      musicProps.lyricRef.current = [];
      musicProps.currentIndexRef.current = 0;
    }
    const data = await getPreviousMusic(
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
