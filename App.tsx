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
import {
  FlatList,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import SearchDetail from './components/SearchDetail/SearchDetail';
import Login from './components/Login/Login';
import {SearchContext} from './context/SearchContext';
import {ScrollContext} from './context/ScrollContext';
import {UserContext} from './context/UserContext';
import Playlist from './components/PlayList/Playlist';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Provider} from '@ant-design/react-native';

const TransparentTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const HomePage = () => {
  return (
    <View style={styles.homePage}>
      <Header />
      <Content />
    </View>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator initialRouteName="homePage">
      <Tab.Screen
        name="login"
        component={Login}
        options={{
          tabBarShowLabel: false,
          swipeEnabled: true,
          tabBarStyle: {
            height: 0,
          },
        }}
      />
      <Tab.Screen
        name="homePage"
        component={HomePage}
        options={{
          tabBarShowLabel: false,
          swipeEnabled: true,
          tabBarStyle: {
            height: 0,
          },
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [bannerUrls, setBannerUrls] = useState<string[]>([]);
  const [globalTheme, setGlobalTheme] = useState<ThemeName>('light');
  const [musicInfo, setMusicInfo] = useState<any>({});
  const [playStatus, setPlayStatus] = useState<boolean>(false);
  // const pauseRef = useRef<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  // const currentTimeRef = useRef<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [profile, setProfile] = useState<any>({});
  const durationRef = useRef<number>(0);
  const [musicUrl, setMusicUrl] = useState<string | null>(null);
  const [result, setResult] = useState<any[]>([]);
  const currentLrcRef = useRef<Text>();
  const musicRef = useRef();
  const scrollRef = useRef<FlatList>();
  const currentIndexRef = useRef<number>(0);
  const lyricRef = useRef<any[]>([]);

  return (
    <NavigationContainer theme={TransparentTheme}>
      <ThemeContext.Provider value={{globalTheme, setGlobalTheme}}>
        <ScrollContext.Provider value={{scrollRef: scrollRef}}>
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
                currentLrcRef: currentLrcRef,
                musicInfo: musicInfo,
                setMusicInfo: setMusicInfo,
                musicRef: musicRef,
                playStatus: playStatus,
                setPlayStatus: setPlayStatus,
                // pauseRef: pauseRef,
                pause: pause,
                setPause: setPause,
                currentTime: currentTime,
                setCurrentTime: setCurrentTime,
                // currentTimeRef: currentTimeRef,
                durationRef: durationRef,
                musicUrl: musicUrl,
                setMusicUrl: setMusicUrl,
                currentIndexRef: currentIndexRef,
                lyricRef: lyricRef,
              }}>
              <SearchContext.Provider
                value={{result: result, setResult: setResult}}>
                <UserContext.Provider
                  value={{profile: profile, setProfile: setProfile}}>
                  <Provider>
                    <ImageBackground
                      source={globalTheme === 'light' ? bak1 : bak2}
                      imageStyle={styles.background}
                      style={styles.background}>
                      <StatusBar
                        translucent={true}
                        backgroundColor={'transparent'}
                      />
                      <MusicDetailModal />
                      <Stack.Navigator>
                        <Stack.Screen
                          name="home"
                          component={HomeTabs}
                          options={{
                            headerShown: false,
                          }}
                        />
                        <Stack.Screen
                          name="search"
                          component={SearchDetail}
                          options={{
                            headerShown: false,
                          }}
                        />
                        <Stack.Screen
                          name="playlist"
                          component={Playlist}
                          options={{
                            title: '歌单',
                            headerStyle: {
                              backgroundColor: 'transparent',
                            },
                            headerTintColor: 'white',
                            headerTitleStyle: {
                              color: 'white',
                              fontWeight: 'bold',
                            },
                          }}
                        />
                      </Stack.Navigator>
                      <MusicController />
                    </ImageBackground>
                  </Provider>
                </UserContext.Provider>
              </SearchContext.Provider>
            </MusicInfoContext.Provider>
          </ComponentsContext.Provider>
        </ScrollContext.Provider>
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
