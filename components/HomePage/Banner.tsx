import React, {useContext, useEffect} from 'react';
import Swiper from 'react-native-swiper';
import {StyleSheet, View} from 'react-native';
import {ComponentsContext} from '../../context/MainContext';
import {Image} from 'react-native-elements';
import {getBannnerImg} from '../../request/HomePage';

export default function Banner(): JSX.Element {
  const props = useContext(ComponentsContext);
  // const bannerUrls = props?.bannerUrls;
  const setBannerUrls = props?.setBannerUrls;
  useEffect(() => {
    // const AbortController =  window.AbortController;
    const pushBannerRequest = async () => {
      const data = await getBannnerImg();
      if (setBannerUrls && data) {
        setBannerUrls(data);
      }
    };
    pushBannerRequest();
  }, [setBannerUrls]);
  return (
    <Swiper
      height={185}
      autoplay={true}
      showsButtons={false}
      showsPagination={false}
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
