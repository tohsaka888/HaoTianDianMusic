import React, {useCallback, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import bak1 from '../../assets/images/bak1.jpg';
import {ComponentsContext, MusicInfoContext} from '../../context/MainContext';
import Video, {OnProgressData} from 'react-native-video';
import {ScrollContext} from '../../context/ScrollContext';
// import {getMusicUrl} from '../../request/getMusicUrl';

export default function MusicController() {
  const musicProps = useContext(MusicInfoContext);
  const props = useContext(ComponentsContext);
  const scrollProps = useContext(ScrollContext);
  const isPlay = useCallback(() => {
    musicProps?.setPause(!musicProps.pause);
  }, [musicProps]);
  const lyric = musicProps?.lyricRef.current;
  // useEffect(() => {
  //   pushMusicRequest();
  // }, [pushMusicRequest]);
  const onProgress = ({currentTime}: OnProgressData): void => {
    musicProps?.setCurrentTime(currentTime);
    let current = musicProps?.currentIndexRef.current || 0;
    if (lyric?.length) {
      while (currentTime >= lyric[current].endTime) {
        if (current < lyric.length - 1) {
          if (musicProps?.currentIndexRef) {
            musicProps.currentIndexRef.current++;
            current++;
          }
        }
      }
      while (currentTime <= lyric[current].startTime) {
        if (current > 0) {
          if (musicProps?.currentIndexRef) {
            musicProps.currentIndexRef.current--;
            current--;
          }
        }
      }
      const scrollRef = scrollProps?.scrollRef.current;
      scrollRef?.scrollToIndex({
        index: current,
        animated: true,
        viewPosition: 0,
      });
    }
  };
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
            paused={musicProps?.pause}
            ref={musicProps?.musicRef}
            onLoad={({duration}) => {
              if (musicProps.durationRef) {
                musicProps.durationRef.current = duration;
              }
            }}
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
              musicProps?.musicUrl && !musicProps?.pause
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
