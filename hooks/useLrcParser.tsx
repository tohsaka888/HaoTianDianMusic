import {useCallback, useContext, useEffect, useState} from 'react';
import {Lrc, Lyric} from 'lrc-kit';
import {getMusicLrc} from '../request/getMusicLrc';
import {MusicInfoContext} from '../context/MainContext';

type Lyrics = {
  startTime: number;
  endTime: number | undefined | null;
  content: string;
};

export default function useLrcParser(id: string): Lyric[] | null {
  const [lyrics, setLyrics] = useState<any[] | null>(null);
  const musicProps = useContext(MusicInfoContext);
  const getLrc = useCallback(async () => {
    if (id) {
      const data = await getMusicLrc(id);
      const lyric: Lyrics[] = [];
      const parsedLyric = Lrc.parse(data).lyrics;
      if (parsedLyric.length !== 0) {
        parsedLyric.map((item: Lyric, index: number) => {
          let startTime = item.timestamp;
          let endTime;
          if (index < parsedLyric.length - 1) {
            endTime = parsedLyric[index + 1].timestamp;
          } else {
            endTime = musicProps?.durationRef.current;
          }
          lyric.push({
            startTime: startTime,
            endTime: endTime,
            content: item.content,
          });
        });
      }
      console.log(lyric)
      setLyrics(lyric);
    }
  }, [id, musicProps?.durationRef]);
  useEffect(() => {
    getLrc();
  }, [getLrc]);
  return lyrics;
}
