import React, {useCallback, useContext} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import {Slider, Toast} from '@ant-design/react-native';
import {MusicInfoContext} from '../../context/MainContext';
import moment from 'moment';
import usePlayNextMusic from '../../hooks/usePlayNextMusic';
import usePlayPreviousMusic from '../../hooks/usePlayPreviousMusic';
import {collectMusic} from '../../request/collectMusic';
// import {UserContext} from '../../context/UserContext';
import storage from '../../storage.config';
// import {ScrollContext} from '../../context/ScrollContext';
// import useLrcParser from '../../hooks/useLrcParser';

export default function ModalFooter() {
  const musicProps = useContext(MusicInfoContext);
  const playNextMusic = usePlayNextMusic();
  const playPreviousMusic = usePlayPreviousMusic();
  // const musicProps = useContext(MusicInfoContext);
  const setPause = useCallback(() => {
    musicProps?.setPause(true);
  }, [musicProps]);
  const isPlay = useCallback(() => {
    musicProps?.setPause(!musicProps.pause);
  }, [musicProps]);
  const collectMyMusic = useCallback(async () => {
    let loginStatus: any = {};
    try {
      loginStatus = await storage.load({key: 'loginStatus'});
    } catch (error) {
      loginStatus.userId = '';
    }
    let userId = null;
    let musicId = null;
    let tags = [];
    userId = loginStatus.userId;
    if (musicProps?.musicInfo) {
      musicId = musicProps.musicInfo.id;
      tags = musicProps.musicInfo.tags;
    }
    if (!musicId) {
      Alert.alert('没有播放中的歌曲');
      return;
    }
    if (!userId) {
      Alert.alert('请先登录');
      return;
    }
    const data = await collectMusic(musicId, userId, tags);
    let updateMusicInfo = musicProps?.musicInfo;
    if (data.success) {
      updateMusicInfo.isCollect = data.isCollect;
    } else {
      Alert.alert(data.message);
    }
    // console.log(updateMusicInfo)
    // musicProps?.setMusicInfo(updateMusicInfo);
  }, [musicProps]);
  // useEffect(() => {
  //   console.log(musicProps?.musicInfo.isCollect);
  // }, [musicProps?.musicInfo.isCollect]);
  return (
    <View style={styles.footer}>
      <View style={styles.controller}>
        <Text style={styles.time}>
          {musicProps && moment(musicProps?.currentTime * 1000).format('mm:ss')}
        </Text>
        {musicProps && musicProps.durationRef.current && (
          <View style={styles.slider}>
            <Slider
              max={musicProps.durationRef.current}
              value={musicProps.currentTime}
              onChange={setPause}
              onAfterChange={value => {
                musicProps.musicRef.current.seek(value);
                musicProps.setPause(false);
              }}
            />
          </View>
        )}
        {musicProps?.durationRef.current && (
          <Text style={styles.time}>
            {moment(musicProps.durationRef.current * 1000).format('mm:ss')}
          </Text>
        )}
      </View>
      <View style={styles.buttons}>
        <Icon
          type="antdesign"
          name="leftcircle"
          size={30}
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
          name={!musicProps?.pause ? 'pausecircle' : 'play'}
          size={30}
          style={styles.centerButton}
          tvParallaxProperties={undefined}
          onPress={isPlay}
        />
        <Icon
          type="antdesign"
          name="rightcircle"
          size={30}
          tvParallaxProperties={undefined}
          onPress={() => {
            if (musicProps?.musicInfo.id) {
              playNextMusic();
            } else {
              Toast.fail('没有播放中的歌曲');
            }
          }}
        />
        <Icon
          type="antdesign"
          name={musicProps?.musicInfo.isCollect ? 'heart' : 'hearto'}
          size={30}
          style={styles.centerButton}
          tvParallaxProperties={undefined}
          onPress={collectMyMusic}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  controller: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  time: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  slider: {
    flex: 5,
  },
  track: {
    height: 3,
  },
  thumb: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  centerButton: {
    marginLeft: 8,
    marginRight: 8,
  },
});
