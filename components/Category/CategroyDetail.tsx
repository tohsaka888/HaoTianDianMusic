import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {getCategroyList} from '../../request/getCategroyList';

export default function CategoryDetail({item}: {item: any}) {
  useEffect(() => {
    const getList = async () => {
      const data = await getCategroyList({tag: item.tag, page: 0});
      console.log(data);
    };
    getList();
  }, [item.tag]);
  return (
    <View>
      <Text>{item?.name}</Text>
    </View>
  );
}
