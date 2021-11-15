import React, {useCallback, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import bak1 from '../../assets/images/bak1.jpg';
import {ComponentsContext, MusicInfoContext} from '../../context/MainContext';
import Video, {OnProgressData} from 'react-native-video';
import {ScrollContext} from '../../context/ScrollContext';
import usePlayNextMusic from '../../hooks/usePlayNextMusic';
import usePlayPreviousMusic from '../../hooks/usePlayPreviousMusic';
import {Toast} from '@ant-design/react-native';

export default function MusicController() {
  const musicProps = useContext(MusicInfoContext);
  const props = useContext(ComponentsContext);
  const scrollProps = useContext(ScrollContext);
  const isPlay = useCallback(() => {
    musicProps?.setPause(!musicProps.pause);
  }, [musicProps]);
  const playNextMusic = usePlayNextMusic();
  const playPreviousMusic = usePlayPreviousMusic();
  const lyric = musicProps?.lyricRef.current;
  const onProgress = ({currentTime}: OnProgressData): void => {
    musicProps?.setCurrentTime(currentTime);
    let current = musicProps?.currentIndexRef.current || 0;
    if (lyric && lyric?.length > 0) {
      // 控制快进到某句歌词
      if (lyric[current] && lyric[current].endTime) {
        while (currentTime >= lyric[current].endTime) {
          if (current < lyric.length - 1) {
            if (musicProps?.currentIndexRef) {
              musicProps.currentIndexRef.current++;
              current++;
            }
          } else {
            break;
          }
        }
        // 控制快退到某句歌词
        while (currentTime <= lyric[current].startTime) {
          if (current > 0) {
            if (musicProps?.currentIndexRef) {
              musicProps.currentIndexRef.current--;
              current--;
            }
          } else {
            break;
          }
        }
        const scrollRef = scrollProps?.scrollRef.current;
        // 防止滚动事件为undefined导致的卡死问题
        if (scrollRef) {
          scrollRef.scrollToIndex({
            index: current,
            animated: true,
            viewPosition: 0,
          });
        }
      }
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
            onEnd={() => {
              playNextMusic();
            }}
            playInBackground={true}
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
            onPress={() => {
              if (musicProps?.musicInfo.id) {
                playPreviousMusic();
              } else {
                Toast.fail('没有播放中的歌曲');
              }
            }}
          />
          <Icon
            type="antdesign"
            name={
              musicProps?.musicUrl && !musicProps?.pause
                ? 'pausecircle'
                : 'play'
            }
            tvParallaxProperties={undefined}
            onPress={() => {
              if (musicProps?.musicInfo.id) {
                isPlay();
              } else {
                Toast.fail('没有播放中的歌曲');
              }
            }}
          />
          <Icon
            type="antdesign"
            name="rightcircle"
            tvParallaxProperties={undefined}
            onPress={() => {
              if (musicProps?.musicInfo.id) {
                playNextMusic();
              } else {
                Toast.fail('没有播放中的歌曲');
              }
            }}
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
