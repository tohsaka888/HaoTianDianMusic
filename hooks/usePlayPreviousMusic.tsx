import {useCallback, useContext} from 'react';
import {MusicInfoContext} from '../context/MainContext';
import {getPreviousMusic} from '../request/Music';
import usePlayMusic from './usePlayMusic';

export default function usePlayPreviousMusic() {
  const playMusic = usePlayMusic();
  const musicProps = useContext(MusicInfoContext);
  const nextMusic = useCallback(async () => {
    const data = await getPreviousMusic(
      musicProps?.playlistId,
      musicProps?.musicInfo.id,
    );
    playMusic(data?.music);
  }, [musicProps?.musicInfo.id, musicProps?.playlistId, playMusic]);
  return nextMusic;
}
