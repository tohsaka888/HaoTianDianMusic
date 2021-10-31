import React, {useCallback, useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import bak1 from '../../assets/images/bak1.jpg';
import {MusicInfoContext} from '../../context/MainContext';
import Video from 'react-native-video';
import {getMusicUrl} from '../../request/getMusicUrl';

export default function MusicController() {
  const musicProps = useContext(MusicInfoContext);
  const [musicUrl, setMusicUrl] = useState<string | null>(null);
  const pushMusicRequest = useCallback(async () => {
    let data;
    let id = '';
    if ((id = musicProps?.musicInfo.id)) {
      data = await getMusicUrl(id);
    }
    if (data) {
      musicProps?.setPlayStatus(true);
    }
    setMusicUrl(data);
  }, [musicProps]);
  const isPlay = useCallback(() => {
    const musicRef = musicProps?.musicRef.current;
    console.log(musicRef.seek)
    // musicProps?.setPlayStatus(!musicProps.playStatus);
    // if (musicProps?.playStatus === false) {
    //   console.log(musicProps.musicRef)
    //   musicProps.musicRef.current.paused = false;
    // }
    // if (musicProps?.playStatus === true) {
    //   console.log(musicProps.musicRef)
    //   musicProps.musicRef.current.paused = true;
    // }
  }, [musicProps]);
  useEffect(() => {
    pushMusicRequest();
  }, [pushMusicRequest]);
  return (
    <View style={styles.controllerMain}>
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
        {musicUrl && (
          <Video
            source={{
              uri: musicUrl,
            }}
            ref={musicProps?.musicRef}
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
            name={musicUrl ? 'pausecircle' : 'play'}
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
    </View>
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
