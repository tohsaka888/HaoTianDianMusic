import React, {useCallback, useContext} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import {MusicInfoContext} from '../../context/MainContext';
import {SearchContext} from '../../context/SearchContext';
import {getMusicUrl} from '../../request/getMusicUrl';
import SearchTitle from './SearchTitle';

export default function SearchDetail() {
  const seachProps = useContext(SearchContext);
  const musicProps = useContext(MusicInfoContext);
  const pushMusicRequest = useCallback(
    async music => {
      let data;
      let id = '';
      if ((id = music.id || musicProps?.musicInfo.id)) {
        data = await getMusicUrl(id);
      }
      musicProps?.setMusicUrl(data);
      if (data === '') {
        Alert.alert('没有音源');
        musicProps?.setPause(true);
      } else {
        musicProps?.setPause(false);
      }
    },
    [musicProps],
  );
  const playMusic = useCallback(
    (music: any) => {
      musicProps?.setMusicInfo(music);
      pushMusicRequest(music);
      if (musicProps?.currentIndexRef) {
        musicProps.currentIndexRef.current = 0;
      }
    },
    [musicProps, pushMusicRequest],
  );
  return (
    <View>
      <SearchTitle />
      <ScrollView>
        {seachProps?.result &&
          seachProps.result.map((item: any, index: number) => {
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
      </ScrollView>
    </View>
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
    borderBottomColor: '#3d3d3dc',
    borderBottomWidth: 1,
  },
  song: {
    flex: 5,
  },
  button: {
    flex: 1,
  },
});
