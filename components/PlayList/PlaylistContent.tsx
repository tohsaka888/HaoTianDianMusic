import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Icon} from 'react-native-elements';
import usePlayMusic from '../../hooks/usePlayMusic';

type Props = {
  tracks: any[];
};

const MusicDetail = ({item, index}: {item: any; index: number}) => {
  const playMusic = usePlayMusic();
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
};

const renderItem = ({item, index}: {item: any; index: number}) => {
  return <MusicDetail key={index} item={item} index={index} />;
};

export default function PlaylistContent({tracks}: Props) {
  return (
    <FlatList
      data={tracks}
      renderItem={renderItem}
      style={styles.content}
      initialNumToRender={10}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={<View style={styles.blank} />}
      ListFooterComponent={<View style={styles.blank} />}
    />
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
