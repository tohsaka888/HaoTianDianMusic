import {Toast} from '@ant-design/react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Image} from 'react-native-elements';
import bak1 from '../../assets/images/bak1.jpg';
import {getLovedMusic} from '../../request/getLovedMusic';

export default function LovedMusic() {
  const [lovedMusic, setLovedMusic] = useState<any>({});
  const navigation = useNavigation<NavigationProp<{playlist: any}>>();
  useEffect(() => {
    const getMusic = async () => {
      const playlist = await getLovedMusic();
      setLovedMusic(playlist);
    };
    getMusic();
  }, []);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (lovedMusic) {
          navigation.navigate('playlist', {
            detail: lovedMusic,
          });
        } else {
          Toast.fail('请先登录');
        }
      }}>
      {lovedMusic && (
        <>
          {lovedMusic.coverImgUrl && (
            <Image
              source={{uri: lovedMusic.coverImgUrl}}
              style={styles.coverImage}
            />
          )}
          <View style={styles.infoArea}>
            <Text style={styles.musicName}>我喜欢的音乐</Text>
            {lovedMusic.tracks && (
              <Text style={styles.numbers}>共{lovedMusic.tracks.length}首</Text>
            )}
          </View>
        </>
      )}
      {!lovedMusic && (
        <>
          <Image source={bak1} style={styles.coverImage} />
          <View style={styles.infoArea}>
            <Text style={styles.musicName}>我喜欢的音乐</Text>
            <Text style={styles.numbers}>共0首</Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 16,
    backgroundColor: '#cecece1f',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  musicName: {
    color: 'white',
    fontSize: 16,
  },
  infoArea: {
    marginLeft: 16,
  },
  numbers: {
    marginTop: 8,
    color: 'white',
  },
});
