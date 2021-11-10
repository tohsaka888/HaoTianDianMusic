import React, {useContext} from 'react';
import {
  // Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon, Image, Text} from 'react-native-elements';
import Banner from './Banner';
import {lightTheme, darkTheme} from '../../context/ThemeContext';
import {AreaContext} from '../../context/AreaContext';
// import {MusicInfoContext} from '../../context/MainContext';
// import {getMusicUrl} from '../../request/getMusicUrl';
import {useNavigation} from '@react-navigation/native';
import usePlayMusic from '../../hooks/usePlayMusic';

type Item = {
  id: string;
  title: string;
  globalTheme: string | undefined;
};

type Props = {
  item: Item;
};

const RenderContent = ({item}: Props) => {
  const randomMusic = useContext(AreaContext);
  const navigation = useNavigation();
  // const musicPlayProps = useContext(MusicInfoContext);
  const playMusic = usePlayMusic();
  return (
    <>
      <View>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <ScrollView horizontal={true}>
        {item.id === '0' &&
          randomMusic?.playlists.map((music: any, index: number) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('playlist');
                }}
                key={index}
                style={styles.randomPlaylist}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('playlist', {
                      detail: music,
                    });
                  }}>
                  <Image
                    source={{uri: music.coverImgUrl}}
                    style={styles.randomPlaylistPicture}
                  />
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.randomPlaylistName}>
                  {music.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        {item.id === '1' &&
          randomMusic?.musicGroups.map((musicGroup: any, i: number) => {
            return (
              <View key={i}>
                {musicGroup.map((music: any, index: number) => {
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
                })}
              </View>
            );
          })}
      </ScrollView>
    </>
  );
};

export default function AreaRender({item}: Props): JSX.Element {
  return (
    <View>
      {item.id === '0' && <Banner />}
      <View
        style={StyleSheet.compose(
          styles.allArea,
          item.globalTheme === 'light' ? lightTheme.theme : darkTheme.theme,
        )}>
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
    padding: 5,
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
    width: 200,
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
});
