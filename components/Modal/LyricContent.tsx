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
      {/* {<View style={styles.blank} />} */}
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
  blankTop: {
    marginTop: '40%',
  },
});
