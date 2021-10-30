/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import Content from './components/HomePage/Content';
import Header from './components/HomePage/Header';
import {ComponentsContext} from './context/MainContext';
import {NavigationContainer} from '@react-navigation/native';
import bak1 from './assets/images/bak1.jpg';
import bak2 from './assets/images/bak2.jpg';
import {ThemeContext, ThemeName} from './context/ThemeContext';
// import {Image} from 'react-native-elements/dist/image/Image';
const App = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [bannerUrls, setBannerUrls] = useState<string[]>([]);
  const [globalTheme, setGlobalTheme] = useState<ThemeName>('light');
  return (
    <NavigationContainer>
      <ThemeContext.Provider value={{globalTheme, setGlobalTheme}}>
        <ComponentsContext.Provider
          value={{
            searchValue: searchValue,
            setSearchValue: setSearchValue,
            setBannerUrls: setBannerUrls,
            bannerUrls: bannerUrls,
          }}>
          <ImageBackground
            source={globalTheme === 'light' ? bak1 : bak2}
            imageStyle={styles.background}
            style={styles.background}>
            <Header />
            <Content />
          </ImageBackground>
        </ComponentsContext.Provider>
      </ThemeContext.Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    zIndex: -10,
    opacity: 0.5,
    background: 'rgba(255,255,255,0.1)',
  },
  background: {
    width: '100%',
    height: '100%',
  },
});

export default App;
