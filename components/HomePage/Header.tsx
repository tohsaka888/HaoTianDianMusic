import React, {useCallback, useContext} from 'react';
import {StyleSheet, View, TouchableOpacity, StatusBar} from 'react-native';
import SearchInput from '../common/SearchInput';
import {Icon} from 'react-native-elements';
// import {getBannnerImg} from '../../request/HomePage';
import {ComponentsContext} from '../../context/MainContext';
import {getMusicByName} from '../../request/SearchResult';
import {ThemeContext} from '../../context/ThemeContext';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {SearchContext} from '../../context/SearchContext';

export default function Header(): JSX.Element {
  const contexts = useContext(ComponentsContext);
  const props = useContext(ThemeContext);
  // const pushBannerRequest = useCallback(async () => {
  //   const data = await getBannnerImg();
  //   contexts?.setBannerUrls(data);
  // }, [contexts]);
  const searchProps = useContext(SearchContext);
  const navigation = useNavigation<NavigationProp<{search: any; home: any}>>();
  const route = useRoute();
  const goBack = useCallback(() => {
    navigation.navigate('home');
  }, [navigation]);
  const searchEvent = useCallback(async () => {
    if (contexts?.searchValue) {
      const data = await getMusicByName(contexts.searchValue);
      searchProps?.setResult(data.result);
    }
    if (route.name !== 'search') {
      navigation.navigate('search');
    }
  }, [contexts?.searchValue, navigation, route, searchProps]);
  const changeTheme = useCallback(() => {
    if (props?.globalTheme === 'dark') {
      props?.setGlobalTheme('light');
    } else {
      props?.setGlobalTheme('dark');
    }
  }, [props]);
  const statusBarHeight = StatusBar.currentHeight;
  return (
    <>
      <View style={{marginTop: statusBarHeight}} />
      <View style={styles.header}>
        <View style={styles.leftButton}>
          {route.name !== 'search' && (
            <TouchableOpacity onPress={changeTheme}>
              <Icon
                name="menufold"
                type="antdesign"
                color="gray"
                tvParallaxProperties={undefined}
              />
            </TouchableOpacity>
          )}
          {route.name === 'search' && (
            <TouchableOpacity onPress={goBack}>
              <Icon
                name="back"
                type="antdesign"
                color="gray"
                tvParallaxProperties={undefined}
              />
            </TouchableOpacity>
          )}
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
    </>
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
