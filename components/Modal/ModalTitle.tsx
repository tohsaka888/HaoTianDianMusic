import React, {useContext} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {ComponentsContext, MusicInfoContext} from '../../context/MainContext';

export default function ModalTitle() {
  const musicProps = useContext(MusicInfoContext);
  const props = useContext(ComponentsContext);
  const statusBarHeight = StatusBar.currentHeight;
  return (
    <>
      <View style={{marginTop: statusBarHeight}} />
      <View style={styles.titleContainer}>
        <Icon
          name="down"
          type="antdesign"
          color={'black'}
          onPress={() => {
            if (musicProps?.lyricRef) {
              musicProps.lyricRef.current = [];
              musicProps.currentIndexRef.current = 0;
            }
            props?.setVisible(false);
          }}
        />
        <View>
          <Text numberOfLines={1} style={styles.title}>
            {musicProps?.musicInfo.name}
          </Text>
          <Text numberOfLines={1} style={styles.artists}>
            {musicProps?.musicInfo.ar.map((item: any) => {
              return item.name;
            })}
          </Text>
        </View>
        <Icon
          name="link"
          type="antdesign"
          color={'black'}
          // style={styles.titleIcon}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 18,
    width: 250,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 10,
    height: 60,
    // backgroundColor: '#4b4b4b2b',
  },
  titleIcon: {
    position: 'absolute',
  },
  artists: {
    color: 'black',
    textAlign: 'center',
  },
});
