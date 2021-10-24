import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import Banner from './Banner';

type Item = {
  id: string;
  title: string;
};

type Props = {
  item: Item;
};

export default function AreaRender({item}: Props) {
  return (
    <View>
      {item.id === '0' && <Banner />}
      <View>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <ScrollView horizontal={true}>
        <Text>{item.title}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '900',
  },
});
