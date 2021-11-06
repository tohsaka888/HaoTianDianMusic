import React, {useCallback, useContext, useEffect} from 'react';
import Swiper from 'react-native-swiper';
import {StyleSheet, View} from 'react-native';
import {ComponentsContext} from '../../context/MainContext';
import {Image} from 'react-native-elements';
import {getBannnerImg} from '../../request/HomePage';

export default function Banner(): JSX.Element {
  const props = useContext(ComponentsContext);
  const pushBannerRequest = useCallback(
    async signal => {
      const data = await getBannnerImg(signal);
      props?.setBannerUrls(data);
    },
    [props],
  );
  useEffect(() => {
    // const AbortController =  window.AbortController;
    // eslint-disable-next-line no-undef
    const controller = new AbortController();
    const {signal} = controller;
    pushBannerRequest(signal);
    return () => {
      if (props?.bannerUrls && props?.bannerUrls.length > 0) {
        controller.abort();
      }
    };
  }, [props?.bannerUrls, props?.bannerUrls.length, pushBannerRequest]);
  return (
    <Swiper
      height={185}
      autoplay={true}
      showsButtons={false}
      autoplayTimeout={2}
      loop={true}>
      {props?.bannerUrls.map((item: string, index: number) => {
        return (
          <View key={index} style={styles.imgOuter}>
            <Image source={{uri: item}} style={styles.images} />
          </View>
        );
      })}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 5,
  },
  images: {
    height: 150,
    borderRadius: 10,
    margin: 5,
  },
  imgOuter: {
    padding: 5,
    backgroundColor: '#94949440',
    margin: 5,
    borderRadius: 10,
    marginTop: 10,
    opacity: 1,
  },
});
