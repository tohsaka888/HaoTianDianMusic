import {useCallback, useContext} from 'react';
import {MusicInfoContext} from '../context/MainContext';
import {getNextMusic} from '../request/Music';
import usePlayMusic from './usePlayMusic';

export default function usePlayNextMusic() {
  const playMusic = usePlayMusic();
  const musicProps = useContext(MusicInfoContext);
  const nextMusic = useCallback(async () => {
    const data = await getNextMusic(
      musicProps?.playlistId,
      musicProps?.musicInfo.id,
    );
    playMusic(data?.music);
  }, [musicProps?.musicInfo.id, musicProps?.playlistId, playMusic]);
  return nextMusic;
}
