import React, {useContext} from 'react';
import {Text, FlatList, StyleSheet} from 'react-native';
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
      {musicProps?.currentTimeRef.current &&
      item?.startTime < musicProps?.currentTimeRef.current &&
      item?.endTime > musicProps?.currentTimeRef.current ? (
        <Text
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
        <Text style={styles.lyric} key={index}>
          {item.content}
        </Text>
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
  return (
    <FlatList
      data={lyrics}
      renderItem={renderItem}
      ref={refs => {
        if (scrollProps?.scrollRef) {
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
  },
  currentLyric: {
    color: 'red',
    textAlign: 'center',
    flex: 1,
  },
});
