import React, {useCallback, useContext, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import SearchInput from '../common/SearchInput';
import {Icon} from 'react-native-elements';
import {getBannnerImg} from '../../request/HomePage';
import {ComponentsContext} from '../../context/MainContext';
import {getMusicByName} from '../../request/SearchResult';
import {ThemeContext} from '../../context/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {SearchContext} from '../../context/SearchContext';

export default function Header(): JSX.Element {
  const contexts = useContext(ComponentsContext);
  const props = useContext(ThemeContext);
  const searchProps = useContext(SearchContext);
  const navigation = useNavigation();
  useEffect(() => {
    getBannnerImg().then(value => {
      contexts?.setBannerUrls(value);
    });
  }, [contexts, contexts?.setBannerUrls]);
  const searchEvent = useCallback(async () => {
    if (contexts?.searchValue) {
      const data = await getMusicByName(contexts.searchValue);
      searchProps?.setResult(data.result);
    }
    navigation.navigate('search');
  }, [contexts?.searchValue, navigation, searchProps]);
  const changeTheme = useCallback(() => {
    if (props?.globalTheme === 'dark') {
      props?.setGlobalTheme('light');
    } else {
      props?.setGlobalTheme('dark');
    }
  }, [props]);
  return (
    <View style={styles.header}>
      <View style={styles.leftButton}>
        <TouchableOpacity onPress={changeTheme}>
          <Icon
            name="menufold"
            type="antdesign"
            color="gray"
            tvParallaxProperties={undefined}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.centerSearch}>
        <SearchInput />
      </View>
      <View style={styles.rightButton}>
        <TouchableOpacity onPress={searchEvent}>
          <Icon
            name="search1"
            type="antdesign"
            color="gray"
            tvParallaxProperties={undefined}
          />
        </TouchableOpacity>
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
    backgroundColor: '#35353547',
  },
});
