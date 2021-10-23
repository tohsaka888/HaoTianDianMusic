import React from 'react';
import {StyleSheet, View} from 'react-native';
import SearchInput from '../common/SearchInput';
import {Icon} from 'react-native-elements';

export default function Header(): JSX.Element {
  return (
    <View style={styles.header}>
      <View style={styles.leftButton}>
        <Icon
          name="menufold"
          type="antdesign"
          color="gray"
          tvParallaxProperties={undefined}
        />
      </View>
      <View style={styles.centerSearch}>
        <SearchInput />
      </View>
      <View style={styles.rightButton}>
        <Icon
          name="search1"
          type="antdesign"
          color="gray"
          tvParallaxProperties={undefined}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  leftButton: {
    flex: 1,
    textAlign: 'right',
    verticalAlign: 'middle',
  },
  leftButtonText: {
    textAlign: 'right',
  },
  rightButton: {
    flex: 1,
  },
  rightButtonText: {
    textAlign: 'left',
  },
  centerSearch: {
    flex: 12,
  },
  header: {
    height: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
