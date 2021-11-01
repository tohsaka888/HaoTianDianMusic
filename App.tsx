/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import Content from './components/HomePage/Content';
import Header from './components/HomePage/Header';
import MusicController from './components/common/MusicController';
import {ComponentsContext, MusicInfoContext} from './context/MainContext';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import bak1 from './assets/images/bak1.jpg';
import bak2 from './assets/images/bak2.jpg';
import {ThemeContext, ThemeName} from './context/ThemeContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MusicDetailModal from './components/common/MusicDetailModal';
// import {Image} from 'react-native-elements/dist/image/Image';

const TransparentTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const Stack = createNativeStackNavigator();

const HomePage = () => {
  return (
    <View style={styles.homePage}>
      <Header />
      <Content />
    </View>
  );
};

const App = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [bannerUrls, setBannerUrls] = useState<string[]>([]);
  const [globalTheme, setGlobalTheme] = useState<ThemeName>('light');
  const [musicInfo, setMusicInfo] = useState<any>({});
  const [playStatus, setPlayStatus] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const currentTimeRef = useRef<number>(null);
  const durationRef = useRef<number>(null);
  const [musicUrl, setMusicUrl] = useState<string | null>(null);
  const musicRef = useRef();
  return (
    <NavigationContainer theme={TransparentTheme}>
      <ThemeContext.Provider value={{globalTheme, setGlobalTheme}}>
        <ComponentsContext.Provider
          value={{
            searchValue: searchValue,
            setSearchValue: setSearchValue,
            setBannerUrls: setBannerUrls,
            bannerUrls: bannerUrls,
            visible: visible,
            setVisible: setVisible,
          }}>
          <MusicInfoContext.Provider
            value={{
              musicInfo: musicInfo,
              setMusicInfo: setMusicInfo,
              musicRef: musicRef,
              playStatus: playStatus,
              setPlayStatus: setPlayStatus,
              paused: paused,
              setPaused: setPaused,
              currentTimeRef: currentTimeRef,
              durationRef: durationRef,
              musicUrl: musicUrl,
              setMusicUrl: setMusicUrl,
            }}>
            <ImageBackground
              source={globalTheme === 'light' ? bak1 : bak2}
              imageStyle={styles.background}
              style={styles.background}>
              <MusicDetailModal />
              <Stack.Navigator>
                <Stack.Screen
                  name="home"
                  component={HomePage}
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack.Navigator>
              <MusicController />
            </ImageBackground>
          </MusicInfoContext.Provider>
        </ComponentsContext.Provider>
      </ThemeContext.Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    opacity: 1,
    background: 'rgba(255,255,255,1)',
  },
  background: {
    width: '100%',
    height: '100%',
  },
  homePage: {
    backgroundColor: '#0000000f',
  },
});

export default App;
