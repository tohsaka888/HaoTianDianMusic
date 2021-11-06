import React, {useCallback, useContext, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import bak1 from '../../assets/images/bak1.jpg';
import {ComponentsContext, MusicInfoContext} from '../../context/MainContext';
import Video, {OnProgressData} from 'react-native-video';
import useLrcParser from '../../hooks/useLrcParser';
import {ScrollContext} from '../../context/ScrollContext';
// import {getMusicUrl} from '../../request/getMusicUrl';

export default function MusicController() {
  const musicProps = useContext(MusicInfoContext);
  const props = useContext(ComponentsContext);
  const scrollProps = useContext(ScrollContext);
  const isPlay = useCallback(() => {
    musicProps?.setPaused(!musicProps.paused);
  }, [musicProps]);
  const lyric = useLrcParser(musicProps?.musicInfo.id);
  // useEffect(() => {
  //   pushMusicRequest();
  // }, [pushMusicRequest]);
  const currentIndexRef = useRef<number>(0);
  const onProgress = useCallback(
    ({currentTime, seekableDuration}: OnProgressData): void => {
      if (musicProps?.currentTimeRef && musicProps.durationRef) {
        musicProps.currentTimeRef.current = currentTime;
        musicProps.durationRef.current = seekableDuration;
      }
      if (lyric?.length) {
        if (currentTime >= lyric[currentIndexRef.current].endTime) {
          if (currentIndexRef.current < lyric.length - 1) {
            currentIndexRef.current++;
          }
        }
      }
      console.log(currentIndexRef.current);
      scrollProps?.scrollRef.current?.scrollToIndex({
        index: currentIndexRef.current,
        animated: true,
        viewPosition: 0.5,
      });
    },
    [
      lyric,
      musicProps?.currentTimeRef,
      musicProps?.durationRef,
      scrollProps?.scrollRef,
    ],
  );
  return (
    <TouchableOpacity
      style={styles.controllerMain}
      onPress={() => {
        if (musicProps?.musicUrl) {
          props?.setVisible(true);
        } else {
          Alert.alert('没有播放中的歌曲');
        }
      }}>
      <View style={styles.controller}>
        <View style={styles.musicPictureMain}>
          <Image
            source={
              musicProps?.musicInfo.picUrl
                ? {uri: musicProps?.musicInfo.picUrl}
                : bak1
            }
            style={styles.musicPicture}
          />
        </View>
        <View style={styles.musicInfo}>
          <Text numberOfLines={1}>
            {musicProps?.musicInfo.name || '暂无歌曲名'}
          </Text>
          <Text numberOfLines={1} style={styles.artists}>
            {musicProps?.musicInfo.ar
              ? musicProps?.musicInfo.ar.map((item: any) => item.name + ' ')
              : '暂无歌手信息'}
          </Text>
        </View>
        {musicProps?.musicUrl && (
          <Video
            source={{
              uri: musicProps.musicUrl,
            }}
            paused={musicProps?.paused}
            ref={musicProps?.musicRef}
            onProgress={onProgress}
          />
        )}
        <View style={styles.buttons}>
          <Icon
            type="antdesign"
            name="leftcircle"
            tvParallaxProperties={undefined}
          />
          <Icon
            type="antdesign"
            name={
              musicProps?.musicUrl && !musicProps?.paused
                ? 'pausecircle'
                : 'play'
            }
            tvParallaxProperties={undefined}
            onPress={isPlay}
          />
          <Icon
            type="antdesign"
            name="rightcircle"
            tvParallaxProperties={undefined}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  controllerMain: {
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    borderTopWidth: 1,
  },
  musicPicture: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  musicPictureMain: {
    flex: 1,
  },
  controller: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  musicInfo: {
    marginLeft: 10,
    flex: 5,
  },
  artists: {
    fontSize: 10,
  },
  buttons: {
    flex: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
