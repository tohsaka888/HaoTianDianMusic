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
        <View
          key={index}
          // eslint-disable-next-line react-native/no-inline-styles
          style={styles.current}>
          <Text numberOfLines={1} style={styles.currentLyric}>
            {item.content}
          </Text>

          {item.contentZH !== '' && (
            <Text numberOfLines={1} style={styles.currentLyricZH}>
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
            <Text numberOfLines={1} style={styles.lyricZH}>
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

export default function LyricContent({showPicture}: {showPicture: boolean}) {
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
      // eslint-disable-next-line react-native/no-inline-styles
      style={[styles.flatlist, {opacity: showPicture ? 0 : 1}]}
      ListHeaderComponent={<View style={{height: window.height / 2 - 120}} />}
      ListFooterComponent={<View style={{height: window.height / 2 - 120}} />}
      renderItem={renderItem}
      getItemLayout={(data, index) =>
        // data && data[index].contentZH
        //   ? {length: 72, offset: 72 * index, index}
        //   : {length: 36, offset: 36 * index, index}
        ({length: 55, offset: 55 * index, index})
      }
      onScrollBeginDrag={() => {
        musicProps?.setDrag(true);
      }}
      onScrollEndDrag={() => {
        setTimeout(() => {
          musicProps?.setDrag(false);
        }, 1500);
      }}
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
  },
  lyricZH: {
    color: 'black',
    textAlign: 'center',
    flex: 1,
    fontSize: 13,
  },
  currentLyric: {
    color: 'red',
    textAlign: 'center',
    flex: 1,
    fontSize: 16,
  },
  currentLyricZH: {
    color: 'red',
    textAlign: 'center',
    flex: 1,
    fontSize: 13,
  },
  current: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    verticalAlign: 'middle',
  },
  flatlist: {
    width: '100%',
    height: '100%',
  },
});
