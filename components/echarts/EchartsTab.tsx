import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {WebView} from 'react-native-webview';

const Tab = createMaterialTopTabNavigator();

const EchartsWebview = () => {
  return (
    <WebView
      style={styles.webview}
      nestedScrollEnabled={false}
      originWhitelist={['http://*', 'https://*']}
      source={{uri: 'http://81.68.113.218:10086/'}}
    />
  );
};

export default function EchartsTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="tags"
        children={EchartsWebview}
        options={{
          tabBarScrollEnabled: true,
          tabBarStyle: {
            backgroundColor: 'transparent',
          },
          tabBarItemStyle: {
            width: 100,
            height: 50,
          },
          tabBarLabelStyle: {
            color: 'white',
            fontWeight: 'bold',
          },
          tabBarIndicatorStyle: {
            backgroundColor: 'red',
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    backgroundColor: '#ffffff14',
    borderRadius: 10,
  },
});
