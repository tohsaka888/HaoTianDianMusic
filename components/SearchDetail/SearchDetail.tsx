import {Toast} from '@ant-design/react-native';
import React, {useCallback, useContext, useState} from 'react';
import {View, Text, StyleSheet, Alert, FlatList} from 'react-native';
import {Icon} from 'react-native-elements';
import {MusicInfoContext} from '../../context/MainContext';
import {SearchContext} from '../../context/SearchContext';
import {getMusicUrl} from '../../request/getMusicUrl';
import {getNextPageMusic} from '../../request/SearchResult';
import SearchTitle from './SearchTitle';

const SearchResult = ({item, index}: {item: any; index: number}) => {
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
    <View key={index} style={styles.container}>
      <View style={styles.song}>
        <Text style={styles.title} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.artists} numberOfLines={1}>
          {item.ar &&
            item.ar.length &&
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
};

const RenderItem = ({item, index}: {item: any; index: number}) => {
  return <SearchResult item={item} index={index} />;
};

export default function SearchDetail() {
  const seachProps = useContext(SearchContext);
  const [currentPage, setCurrentPage] = useState<number>(2);
  const getNextPage = useCallback(async () => {
    const data = await getNextPageMusic(currentPage);
    if (data.result) {
      setCurrentPage(currentPage + 1);
      seachProps?.setResult(seachProps.result.concat(data.result));
    } else {
      Toast.fail({content: '已经到底啦~'});
    }
  }, [currentPage, seachProps]);

  return (
    <View>
      <SearchTitle />
      {seachProps?.result && (
        <FlatList
          data={seachProps.result}
          renderItem={RenderItem}
          style={styles.scroll}
          onEndReachedThreshold={0.5}
          onEndReached={getNextPage}
        />
      )}
      <View style={styles.blank} />
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
  blank: {
    height: 60,
  },
  scroll: {
    marginBottom: 30,
  },
});
