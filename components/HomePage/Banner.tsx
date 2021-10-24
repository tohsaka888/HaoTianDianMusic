import React, {useContext} from 'react';
import Swiper from 'react-native-swiper';
import {StyleSheet} from 'react-native';
import {ComponentsContext} from '../../context/MainContext';
import {Image} from 'react-native-elements';

export default function Banner(): JSX.Element {
  const {bannerUrls} = useContext(ComponentsContext);
  return (
    <Swiper height={200} showsButtons={false} autoplayTimeout={1}>
      {bannerUrls.map((item: string, index: number) => {
        return <Image source={{uri: item}} key={index} style={styles.images} />;
      })}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 180,
  },
  images: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
});
