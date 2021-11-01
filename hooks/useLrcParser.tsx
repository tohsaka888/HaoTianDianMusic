import React, {useCallback, useEffect} from 'react';
import {Lrc} from 'lrc-kit';
import {getMusicLrc} from '../request/getMusicLrc';

export default function useLrcParser(id: string) {
  const getLrc = useCallback(async () => {
    if (id) {
      const data = await getMusicLrc(id);
      console.log(data);
    }
  }, [id]);
  useEffect(() => {
    getLrc();
  }, [getLrc]);
}
