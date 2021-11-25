import React, {useContext, useRef} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon, Image, Text} from 'react-native-elements';
import {lightTheme, darkTheme} from '../../context/ThemeContext';
import {AreaContext} from '../../context/AreaContext';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import usePlayMusic from '../../hooks/usePlayMusic';
import {MusicInfoContext} from '../../context/MainContext';
import WebView from 'react-native-webview';

type Item = {
  id: string;
  title: string;
  globalTheme: string | undefined;
};

type Props = {
  item: Item;
};

const Playlist = ({item, index}: {item: any; index: number}) => {
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
const PlaylistRenderItem = ({item, index}: {item: any; index: number}) => {
  return <Playlist item={item} index={index} />;
};

const Music = ({musicGroup, i}: {musicGroup: any; i: number}) => {
  const playMusic = usePlayMusic();
  return (
    <View key={i}>
      {musicGroup.length !== 0 ? (
        musicGroup.map((music: any, index: number) => {
          return (
            <View key={index} style={styles.randomMusic}>
              <Image
                source={{uri: music.picUrl}}
                style={styles.randomMusicPicture}
              />
              <View>
                <Text numberOfLines={1} style={styles.randomMusicName}>
                  {music.name}
                </Text>
                <Text numberOfLines={1} style={styles.randomArtists}>
                  {music.ar.map((text: any) => {
                    return text.name;
                  })}
                </Text>
              </View>
              <View>
                <Icon
                  type="antdesign"
                  name="play"
                  tvParallaxProperties={undefined}
                  onPress={() => {
                    playMusic(music);
                  }}
                />
              </View>
            </View>
          );
        })
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
};

const MusicRenderItem = ({item, index}: {item: any; index: number}) => {
  return <Music musicGroup={item} i={index} />;
};

const RenderContent = ({item}: Props) => {
  const randomMusic = useContext(AreaContext);
  const scrollRef = useRef<FlatList>();
  return (
    <>
      <View>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      {item.id === '0' && (
        <View style={styles.flatlist}>
          {randomMusic?.playlists.length !== 0 ? (
            <FlatList
              ref={refs => {
                if (refs) {
                  scrollRef.current = refs;
                }
              }}
              data={randomMusic?.playlists}
              renderItem={PlaylistRenderItem}
              initialNumToRender={4}
              horizontal={true}
              // scrollEnabled={scrollEnable}
              // onEndReachedThreshold={0.1}
              // onEndReached={() => {
              //   setScrollEnable(false);
              //   setTimeout(() => {
              //     setScrollEnable(true);
              //   }, 500);
              // }}
            />
          ) : (
            <ActivityIndicator size="large" style={styles.loading} />
          )}
        </View>
      )}
      {item.id === '1' && (
        <View style={styles.musicGroup}>
          {randomMusic?.musicGroups.length !== 0 ? (
            <FlatList
              data={randomMusic?.musicGroups}
              renderItem={MusicRenderItem}
              horizontal={true}
              initialNumToRender={2}
            />
          ) : (
            <ActivityIndicator size="large" style={styles.loading} />
          )}
        </View>
      )}
      {item.id === '2' && (
        <View style={styles.analysis}>
          <WebView
            style={styles.webview}
            nestedScrollEnabled={false}
            originWhitelist={['http://*', 'https://*']}
            source={{uri: 'http://81.68.113.218:10086/'}}
          />
        </View>
      )}
    </>
  );
};

export default function AreaRender({item}: Props): JSX.Element {
  return (
    <View>
      <View
        style={[
          styles.allArea,
          item.globalTheme === 'light' ? lightTheme.theme : darkTheme.theme,
        ]}>
        <RenderContent item={item} />
      </View>
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
    flex: 1,
  },
  randomArtists: {
    fontSize: 10,
    fontWeight: 'bold',
    width: 200,
  },
  flatlist: {
    height: 140,
  },
  musicGroup: {
    height: 250,
  },
  loading: {
    flex: 1,
  },
  analysis: {
    height: 500,
  },
  webview: {
    backgroundColor: 'transparent',
  },
});
