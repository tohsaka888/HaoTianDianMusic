import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Image} from 'react-native-elements';
import {UserContext} from '../../context/UserContext';
import {getUserPlaylist} from '../../request/UserMusic';

const renderItem = ({item, index}: {item: any; index: number}) => {
  return (
    <View key={index}>
      <View style={styles.playlist}>
        <Image source={{uri: item.coverImgUrl}} style={styles.cover} />
        <View>
          <Text numberOfLines={1} style={styles.playlistTitle}>
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
    </View>
  );
};

export default function RecommendPlaylist() {
  const [playlist, setPlaylist] = useState<any[]>([]);
  const userProps = useContext(UserContext);
  useEffect(() => {
    const getRecommendPlaylist = async () => {
      const data = await getUserPlaylist(userProps?.profile.userId || '');
      setPlaylist(data);
    };
    getRecommendPlaylist();
  }, [userProps?.profile]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>推荐歌单</Text>
      <FlatList data={playlist} renderItem={renderItem} />
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
  playlistTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  playlist: {
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
});
