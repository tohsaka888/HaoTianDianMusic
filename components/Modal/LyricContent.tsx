import React, {useContext} from 'react';
import {Text, ScrollView, StyleSheet, View} from 'react-native';
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
      {lyrics?.map((item: any, index: number) => {
        return (
          <View key={index}>
            {musicProps?.currentTimeRef.current &&
            item?.startTime < musicProps?.currentTimeRef.current &&
            item?.endTime > musicProps?.currentTimeRef.current ? (
              <Text style={styles.currentLyric}>{item.content}</Text>
            ) : (
              <Text style={styles.lyric}>{item.content}</Text>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lyric: {
    color: 'black',
    textAlign: 'center',
    flex: 1,
  },
  currentLyric: {
    color: 'red',
    textAlign: 'center',
    flex: 1,
  },
});
