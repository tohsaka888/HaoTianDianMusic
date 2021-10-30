import React, {useCallback, useContext} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {ComponentsContext} from '../../context/MainContext';

export default function SearchInput(): JSX.Element {
  const props = useContext(ComponentsContext);
  const inputEvent = useCallback(
    value => {
      props?.setSearchValue(value);
    },
    [props],
  );
  return (
    <View style={styles.searchBorder}>
      <TextInput
        placeholder="请输入(暂时只支持搜索歌名)"
        onChangeText={inputEvent}
        placeholderTextColor={'#cecece'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBorder: {
    borderWidth: 1,
    borderColor: '#cecece',
    borderRadius: 18,
    lineHeight: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 15,
    marginRight: 15,
  },
});
