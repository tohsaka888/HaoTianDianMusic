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
import {StyleSheet, View} from 'react-native';
import Content from './components/HomePage/Content';
import Header from './components/HomePage/Header';
import {ComponentsContext} from './context/MainContext';

const App = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  return (
    <>
      <ComponentsContext.Provider
        value={{searchValue: searchValue, setSearchValue: setSearchValue}}>
        <View style={styles.lightTheme}>
          <Header />
          <Content />
        </View>
      </ComponentsContext.Provider>
    </>
  );
};

const styles = StyleSheet.create({
  lightTheme: {
    backgroundColor: '#f7f7f7',
  },
});

export default App;
