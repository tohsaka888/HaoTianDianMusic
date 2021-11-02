import React, {useCallback, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Slider, Icon} from 'react-native-elements';
import {MusicInfoContext} from '../../context/MainContext';
import moment from 'moment';
import {ScrollContext} from '../../context/ScrollContext';
import useLrcParser from '../../hooks/useLrcParser';

export default function ModalFooter() {
  const musicProps = useContext(MusicInfoContext);
  const scrollProps = useContext(ScrollContext);
  const lyric = useLrcParser(musicProps?.musicInfo.id)
  const updateLynic = useCallback((value) => {

  }, []);
  const isPlay = useCallback(() => {
    musicProps?.setPaused(!musicProps.paused);
    console.log(lyric)
  }, [musicProps]);
  return (
    <View style={styles.footer}>
      <View style={styles.controller}>
        {musicProps?.currentTimeRef.current && (
          <Text style={styles.time}>
            {moment(musicProps.currentTimeRef.current * 1000).format('mm:ss')}
          </Text>
        )}
        {musicProps?.currentTimeRef.current && musicProps.durationRef.current && (
          <Slider
            style={styles.slider}
            maximumValue={musicProps.durationRef.current}
            value={musicProps.currentTimeRef.current}
            trackStyle={styles.track}
            thumbStyle={styles.thumb}
            onSlidingStart={() => musicProps.setPaused(true)}
            onValueChange={updateLynic}
            onSlidingComplete={value => {
              musicProps.musicRef.current.seek(value);
              musicProps.setPaused(false);
            }}
            thumbProps={{
              children: (
                <Icon
                  name="heartbeat"
                  type="font-awesome"
                  size={15}
                  color="#f50"
                  tvParallaxProperties={undefined}
                />
              ),
            }}
          />
        )}
        {musicProps?.durationRef.current && (
          <Text style={styles.time}>
            {moment(musicProps.durationRef.current * 1000).format('mm:ss')}
          </Text>
        )}
      </View>
      <View style={styles.buttons}>
        <Icon
          type="antdesign"
          name="leftcircle"
          size={30}
          tvParallaxProperties={undefined}
        />
        <Icon
          type="antdesign"
          name={!musicProps?.paused ? 'pausecircle' : 'play'}
          size={30}
          style={styles.centerButton}
          tvParallaxProperties={undefined}
          onPress={isPlay}
        />
        <Icon
          type="antdesign"
          name="rightcircle"
          size={30}
          tvParallaxProperties={undefined}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  controller: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  time: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  slider: {
    flex: 5,
  },
  track: {
    height: 3,
  },
  thumb: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-around',
  },
  centerButton: {
    marginLeft: 8,
    marginRight: 8,
  },
});
