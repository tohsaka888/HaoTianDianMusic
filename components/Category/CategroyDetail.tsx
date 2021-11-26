import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {FlatList} from 'react-native';
import {Image} from 'react-native-elements';
// import WebView from 'react-native-webview';
import {MusicInfoContext} from '../../context/MainContext';
import {getCategoryDetail} from '../../request/getCategoryDetail';

const PlaylistDetail = ({item, index}: {item: any; index: number}) => {
  const navigation = useNavigation<NavigationProp<{playlist: any}>>();
  const musicProps = useContext(MusicInfoContext);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate({key: 'playlist'});
      }}
      key={index}
      style={styles.randomPlaylist}>
      <TouchableOpacity
        onPress={() => {
          musicProps?.setPlaylistId(item.id);
          navigation.navigate('playlist', {
            detail: item,
          });
        }}>
        <Image
          source={{uri: item.coverImgUrl}}
          style={styles.randomPlaylistPicture}
        />
      </TouchableOpacity>
      <Text numberOfLines={1} style={styles.randomPlaylistName}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const renderItem = ({item, index}: {item: any; index: number}) => {
  return <PlaylistDetail item={item} index={index} />;
};

export default function CategoryDetail({item}: {item: any}) {
  const isFocused = useIsFocused();
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [page, setPage] = useState<number>(2);
  const getCategoryList = useCallback(async () => {
    const data = await getCategoryDetail(item.name, page);
    setPlaylists([...playlists, ...data]);
    setPage(page + 1);
  }, [item.name, page, playlists]);
  useEffect(() => {
    if (isFocused === true) {
      const getList = async () => {
        const data = await getCategoryDetail(item.name);
        setPlaylists(data);
      };
      getList();
    }
  }, [isFocused, item.name, playlists]);
  return (
    <View style={styles.webview}>
      {playlists?.length !== 0 ? (
        <FlatList
          columnWrapperStyle={styles.row}
          numColumns={3}
          data={playlists}
          renderItem={renderItem}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            getCategoryList();
          }}
        />
      ) : (
        <ActivityIndicator size="large" style={styles.loading} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '900',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    padding: 5,
    color: 'white',
    marginBottom: 10,
  },
  allArea: {
    margin: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
  allAreaToBottom: {
    marginBottom: 60,
  },
  content: {
    padding: 10,
    color: 'white',
  },
  randomPlaylistName: {
    color: 'white',
    width: 100,
  },
  randomPlaylistPicture: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginBottom: 5,
  },
  randomPlaylist: {
    marginLeft: 8,
    padding: 5,
  },
  randomMusicName: {
    width: 230,
    color: 'black',
    fontWeight: 'bold',
  },
  randomMusicPicture: {
    width: 50,
    height: 50,
    borderRadius: 5,
    flex: 1,
    marginRight: 15,
  },
  randomMusic: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginRight: 15,
    marginLeft: 15,
    // backgroundColor: '#c4c4c44b',
    padding: 10,
    borderRadius: 5,
    boxShadow: '3px 3px 3px gray',
    borderWidth: 1,
    borderColor: '#ebebeb68',
  },
  randomArtists: {
    fontSize: 10,
    fontWeight: 'bold',
    width: 200,
  },
  flatlist: {
    height: 140,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 8,
  },
  loading: {
    marginTop: 50,
  },
  webview: {
    flex: 1,
    backgroundColor: '#ffffff52FF',
  },
});
