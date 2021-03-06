import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Image} from 'react-native-elements';
import {UserContext} from '../../context/UserContext';
import usePlayMusic from '../../hooks/usePlayMusic';
import {getUserMusic} from '../../request/UserMusic';

const RecommendMusics = ({item, index}: {item: any; index: number}) => {
  const playMusic = usePlayMusic();
  return (
    <>
      {item.name ? (
        <TouchableOpacity
          key={index}
          onPress={() => {
            playMusic(item);
          }}>
          <View style={styles.Music}>
            <Image source={{uri: item.picUrl}} style={styles.cover} />
            <View>
              <Text numberOfLines={1} style={styles.MusicTitle}>
                {item.name}
              </Text>
              <View style={styles.tag}>
                {item.tags.map((value: string, i: number) => (
                  <Text style={styles.text} key={i}>
                    {value}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator size="large" style={styles.loading} />
      )}
    </>
  );
};

const renderItem = ({item, index}: {item: any; index: number}) => {
  return <RecommendMusics item={item} index={index} key={index} />;
};

export default function RecommendMusic() {
  const [Music, setMusic] = useState<any[]>([]);
  const userProps = useContext(UserContext);
  useEffect(() => {
    const getRecommendMusic = async () => {
      const data = await getUserMusic(userProps?.profile.userId || '');
      setMusic(data);
    };
    getRecommendMusic();
  }, [userProps?.profile]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>推荐歌曲</Text>
      {Music.length !== 0 ? (
        <FlatList data={Music} renderItem={renderItem} />
      ) : (
        <ActivityIndicator size="large" style={styles.loading} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 16,
    marginTop: 0,
    backgroundColor: '#cecece1f',
    justifyContent: 'center',
    borderRadius: 10,
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 12,
    marginBottom: 8,
  },
  MusicTitle: {
    color: 'black',
    fontWeight: 'bold',
  },
  Music: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cover: {
    height: 50,
    width: 50,
    borderRadius: 8,
    marginRight: 8,
  },
  text: {
    color: 'white',
    fontSize: 12,
    // borderWidth: 1,
    borderRadius: 5,
    // borderColor: '#64edff84',
    marginRight: 4,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#ff1818',
    marginTop: 8,
  },
  tag: {
    display: 'flex',
    flexDirection: 'row',
  },
  loading: {
    flex: 1,
  },
});
