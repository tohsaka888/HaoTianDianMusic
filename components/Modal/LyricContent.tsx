import React, {useContext, useEffect} from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import useLrcParser from '../../hooks/useLrcParser';
import {MusicInfoContext} from '../../context/MainContext';
import {ScrollContext} from '../../context/ScrollContext';

type Props = {
  item: any;
  index: number;
};

const LyricShow = ({item, index}: Props): JSX.Element => {
  const musicProps = useContext(MusicInfoContext);
  const window = useWindowDimensions();
  return (
    <>
      {index === 0 && <View style={{height: window.height / 2 - 60}} />}
      {musicProps?.currentTime &&
      item?.startTime < musicProps?.currentTime &&
      item?.endTime > musicProps?.currentTime ? (
        <Text
          numberOfLines={1}
          style={styles.currentLyric}
          key={index}
          ref={refs => {
            if (refs) {
              musicProps.currentLrcRef.current = refs;
            }
          }}>
          {item.content}
        </Text>
      ) : (
        <Text style={styles.lyric} key={index} numberOfLines={1}>
          {item.content}
        </Text>
      )}
      {index === item.length - 1 && (
        <View style={{height: window.height / 2 - 60}} />
      )}
    </>
  );
};

const renderItem = ({item, index}: Props) => {
  return <LyricShow item={item} index={index} />;
};

export default function LyricContent() {
  const musicProps = useContext(MusicInfoContext);
  const lyrics = useLrcParser(musicProps?.musicInfo.id);
  const scrollProps = useContext(ScrollContext);
  useEffect(() => {
    if (musicProps?.lyricRef && lyrics) {
      musicProps.lyricRef.current = lyrics;
    }
  }, [lyrics, musicProps?.lyricRef]);
  return (
    <FlatList
      data={lyrics}
      renderItem={renderItem}
      getItemLayout={(data, index) => ({length: 36, offset: 36 * index, index})}
      showsVerticalScrollIndicator={false}
      ref={refs => {
        if (scrollProps) {
          scrollProps.scrollRef.current = refs;
        }
      }}
    />
  );
}

const styles = StyleSheet.create({
  lyric: {
    color: 'black',
    textAlign: 'center',
    flex: 1,
    fontSize: 16,
    lineHeight: 36,
  },
  currentLyric: {
    color: 'red',
    textAlign: 'center',
    flex: 1,
    fontSize: 16,
    lineHeight: 36,
  },
});
