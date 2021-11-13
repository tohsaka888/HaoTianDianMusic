import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Icon} from 'react-native-elements';
// import {MusicInfoContext} from '../../context/MainContext';
import usePlayMusic from '../../hooks/usePlayMusic';
// import {getMusicUrl} from '../../request/getMusicUrl';

type Props = {
  tracks: any[];
};

export default function PlaylistContent({tracks}: Props) {
  // const seachProps = useContext(SearchContext);
  // const musicProps = useContext(MusicInfoContext);
  const playMusic = usePlayMusic();
  // const pushMusicRequest = useCallback(
  //   async music => {
  //     let data;
  //     let id = '';
  //     if ((id = music.id || musicProps?.musicInfo.id)) {
  //       data = await getMusicUrl(id);
  //     }
  //     musicProps?.setMusicUrl(data);
  //     if (data === '') {
  //       Alert.alert('没有音源');
  //       musicProps?.setPause(true);
  //     } else {
  //       musicProps?.setPause(false);
  //     }
  //   },
  //   [musicProps],
  // );
  // const playMusic = useCallback(
  //   (music: any) => {
  //     musicProps?.setMusicInfo(music);
  //     pushMusicRequest(music);
  //     if (musicProps?.currentIndexRef) {
  //       musicProps.currentIndexRef.current = 0;
  //     }
  //   },
  //   [musicProps, pushMusicRequest],
  // );
  return (
    <ScrollView style={styles.content}>
      <View style={styles.blank} />
      {tracks.map((item: any, index: number) => {
        return (
          <View key={index} style={styles.container}>
            <View style={styles.song}>
              <Text style={styles.title} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.artists} numberOfLines={1}>
                {item.ar.length &&
                  item.ar?.map((value: any) => {
                    return value.name;
                  })}
              </Text>
            </View>
            <Icon
              type="antdesign"
              name="play"
              color="white"
              tvParallaxProperties={undefined}
              style={styles.button}
              onPress={() => {
                playMusic(item);
              }}
            />
          </View>
        );
      })}
      <View style={styles.blank} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  artists: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  container: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#cecece40',
    borderBottomWidth: 1,
    height: 60,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  song: {
    flex: 5,
  },
  button: {
    flex: 1,
  },
  content: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: '#ffffff29',
    marginTop: 16,
    paddingBottom: 50,
  },
  blank: {
    height: 10,
  },
});
