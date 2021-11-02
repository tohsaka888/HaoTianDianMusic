import React, {useContext} from 'react';
import {Text, ScrollView, StyleSheet} from 'react-native';
import useLrcParser from '../../hooks/useLrcParser';
import {MusicInfoContext} from '../../context/MainContext';
import {Lyric} from 'lrc-kit';
import {ScrollContext} from '../../context/ScrollContext';

export default function LyricContent() {
  const musicProps = useContext(MusicInfoContext);
  const lyrics = useLrcParser(musicProps?.musicInfo.id);
  const scrollProps = useContext(ScrollContext);
  return (
    <ScrollView
      ref={refs => {
        if (scrollProps?.scrollRef) {
          scrollProps.scrollRef.current = refs;
        }
      }}>
      {lyrics?.map((item: Lyric, index: number) => {
        return (
          <Text key={index} style={styles.lyric}>
            {item.content}
          </Text>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lyric: {
    color: 'black',
    textAlign: 'center',
  },
});
