import {useCallback, useEffect, useState} from 'react';
import {Lrc, Lyric} from 'lrc-kit';
import {getMusicLrc} from '../request/getMusicLrc';

export default function useLrcParser(id: string): Lyric[] | null {
  const [lyrics, setLyrics] = useState<Lyric[] | null>(null);
  const getLrc = useCallback(async () => {
    if (id) {
      const data = await getMusicLrc(id);
      setLyrics(Lrc.parse(data).lyrics);
    }
  }, [id]);
  useEffect(() => {
    getLrc();
  }, [getLrc]);
  return lyrics;
}
