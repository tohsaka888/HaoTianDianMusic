import React from 'react';
import {FlatList, Text} from 'react-native';
import AreaRender from './AreaRender';

export default function Content() {
  const DATA = [
    {
      id: '0',
      title:
        'First ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst Item',
    },
    {
      id: '1',
      title: 'Second Item',
    },
    {
      id: '2',
      title: 'Third Item',
    },
  ];
  return (
    <FlatList
      data={DATA}
      renderItem={AreaRender}
      keyExtractor={item => item.id}>
      <Text>11111</Text>
    </FlatList>
  );
}
