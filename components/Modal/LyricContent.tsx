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
  return (
    <>
      {musicProps?.currentTime &&
      item?.startTime &&
      item?.endTime &&
      item.startTime < musicProps.currentTime &&
      item.endTime > musicProps.currentTime ? (
        <View key={index} style={styles.current}>
          <Text numberOfLines={1} style={styles.currentLyric}>
            {item.content}
          </Text>

          {item.contentZH !== '' && (
            <Text numberOfLines={1} style={styles.currentLyric}>
              {item.contentZH}
            </Text>
          )}
        </View>
      ) : (
        <View key={index} style={styles.current}>
          <Text style={styles.lyric} numberOfLines={1}>
            {item.content}
          </Text>

          {item.contentZH !== '' && (
            <Text numberOfLines={1} style={styles.lyric}>
              {item.contentZH}
            </Text>
          )}
        </View>
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
  const window = useWindowDimensions();
  useEffect(() => {
    if (musicProps?.lyricRef && lyrics) {
      musicProps.lyricRef.current = lyrics;
    }
  }, [lyrics, musicProps?.lyricRef]);
  return (
    <FlatList
      data={lyrics}
      style={styles.flatlist}
      ListHeaderComponent={<View style={{height: window.height / 2 - 120}} />}
      ListFooterComponent={<View style={{height: window.height / 2 - 120}} />}
      renderItem={renderItem}
      getItemLayout={(data, index) => ({length: 72, offset: 72 * index, index})}
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
  current: {
    height: 72,
    justifyContent: 'center',
  },
  flatlist: {
    width: '100%',
  },
});
