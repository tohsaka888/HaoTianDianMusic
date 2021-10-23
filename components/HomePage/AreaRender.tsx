import React from 'react';
import {ScrollView, View} from 'react-native';
import {Text} from 'react-native-elements';

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
      {item.id === '0' && <Text>11111111</Text>}
      <Text>title</Text>
      <ScrollView horizontal={true}>
        <Text>{item.title}</Text>
      </ScrollView>
    </View>
  );
}
