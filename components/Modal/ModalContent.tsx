import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useContext, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Image} from 'react-native-elements';
import {MusicInfoContext} from '../../context/MainContext';
// import {ScrollContext} from '../../context/ScrollContext';
import LyricContent from './LyricContent';

const ImageContent = ({showPicture}: {showPicture: boolean}) => {
  const musicProps = useContext(MusicInfoContext);
  return (
    <View style={styles.imageMain}>
      <Image
        source={{uri: musicProps?.musicInfo.picUrl || ''}}
        // eslint-disable-next-line react-native/no-inline-styles
        style={[styles.image, {opacity: showPicture ? 1 : 0}]}
      />
    </View>
  );
};

export default function ModalContent() {
  const [showPicture, setPicture] = useState<boolean>(true);
  const musicProps = useContext(MusicInfoContext);
  return (
    <View style={styles.imageContainer}>
      {/* <Tab.Navigator>
        <Tab.Screen
          name="image"
          component={ImageContent}
          options={{
            tabBarShowLabel: false,
            swipeEnabled: true,
            tabBarStyle: {
              height: 0,
            },
          }}
        />
        <Tab.Screen
          name="lyric"
          component={LyricContent}
          options={{
            tabBarShowLabel: false,
            swipeEnabled: true,
            tabBarStyle: {
              height: 0,
            },
          }}
        />
      </Tab.Navigator> */}
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => {
          setPicture(!showPicture);
          if (!showPicture) {
            if (musicProps?.lyricRef) {
              musicProps.lyricRef.current = [];
              musicProps.currentIndexRef.current = 0;
            }
          }
        }}>
        <ImageContent showPicture={showPicture} />
        <LyricContent showPicture={showPicture} />
        {/* {showPicture ? <ImageContent /> : <LyricContent />} */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    borderRadius: 250,
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 7,
    width: '100%',
  },
  imageMain: {
    flex: 1,
    position: 'absolute',
  },
});
