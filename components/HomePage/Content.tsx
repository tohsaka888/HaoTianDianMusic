import React from 'react';
import {FlatList, Text} from 'react-native';
import AreaRender from './AreaRender';

export default function Content() {
  const DATA = [
    {
      id: '0',
      title: '歌单推荐',
    },
    {
      id: '1',
      title: '人气歌曲',
    },
    {
      id: '2',
      title: '热门分类',
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
