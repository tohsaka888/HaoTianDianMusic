import {Tag} from '@ant-design/react-native';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Image} from 'react-native-elements';

export default function PlaylistHeader({music}: any) {
  const tags: Array<string> = music?.tags || ['暂无标签'];
  return (
    <View style={styles.container}>
      <View>
        <Image source={{uri: music?.coverImgUrl || ''}} style={styles.image} />
      </View>
      <View style={styles.textArea}>
        <Text numberOfLines={2} style={styles.introText}>
          {music.name}
        </Text>
        <View style={styles.tag}>
          {tags.map((item: string, index: number) => (
            <Text style={styles.text} key={index}>
              {item}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    borderRadius: 5,
    // marginRight: 8,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-around',
    padding: 16,
  },
  introText: {
    fontSize: 18,
  },
  textArea: {
    marginLeft: 8,
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#64edff84',
    marginRight: 8,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 3,
    paddingRight: 3,
    backgroundColor: '#04b2e7',
    marginTop: 8,
  },
  tag: {
    display: 'flex',
    flexDirection: 'row',
  },
});
