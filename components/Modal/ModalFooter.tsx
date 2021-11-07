import React, {useCallback, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {Slider} from '@ant-design/react-native';
import {MusicInfoContext} from '../../context/MainContext';
import moment from 'moment';
// import {ScrollContext} from '../../context/ScrollContext';
// import useLrcParser from '../../hooks/useLrcParser';

export default function ModalFooter() {
  const musicProps = useContext(MusicInfoContext);
  const setPause = useCallback(() => {
    musicProps?.setPause(true);
  }, [musicProps]);
  const isPlay = useCallback(() => {
    musicProps?.setPause(!musicProps.pause);
  }, [musicProps]);
  // useEffect(() => {
  //   console.log(musicProps?.pauseRef, musicProps?.currentTimeRef)
  // }, [musicProps?.currentTimeRef, musicProps?.pauseRef])
  return (
    <View style={styles.footer}>
      <View style={styles.controller}>
        <Text style={styles.time}>
          {musicProps && moment(musicProps?.currentTime * 1000).format('mm:ss')}
        </Text>

        {musicProps && musicProps.durationRef.current && (
          <View style={styles.slider}>
            <Slider
              max={musicProps.durationRef.current}
              value={musicProps.currentTime}
              onChange={setPause}
              onAfterChange={value => {
                musicProps.musicRef.current.seek(value);
                musicProps.setPause(false);
              }}
              // thumbProps={{
              //   children: (
              //     <Icon
              //       name="heartbeat"
              //       type="font-awesome"
              //       size={15}
              //       color="#f50"
              //       tvParallaxProperties={undefined}
              //     />
              //   ),
              // }}
            />
          </View>
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
          name={!musicProps?.pause ? 'pausecircle' : 'play'}
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
    marginTop: 8,
  },
  centerButton: {
    marginLeft: 8,
    marginRight: 8,
  },
});
