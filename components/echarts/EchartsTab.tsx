import React, {useEffect, useState} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {WebView} from 'react-native-webview';
import {getAnalysisType} from '../../request/getAnalysisType';

const Tab = createMaterialTopTabNavigator();

const EchartsWebview = ({item}: {item: any}) => {
  return (
    <WebView
      style={styles.webview}
      nestedScrollEnabled={false}
      originWhitelist={['http://*', 'https://*']}
      source={{uri: `http://81.68.113.218:10086/${item?.url}`}}
    />
  );
};

export default function EchartsTab() {
  const [analysisType, setAnalysisType] = useState<{name: string}[]>([]);
  const width = useWindowDimensions().width;
  useEffect(() => {
    const getType = async () => {
      const data = await getAnalysisType();
      setAnalysisType(data);
    };
    getType();
  }, []);
  return (
    <>
      {analysisType.length !== 0 && (
        <Tab.Navigator>
          {analysisType.map((item, index) => {
            return (
              <Tab.Screen
                name={item.name}
                children={() => <EchartsWebview item={item} />}
                key={index}
                options={{
                  tabBarScrollEnabled: true,
                  tabBarStyle: {
                    backgroundColor: 'transparent',
                  },
                  tabBarItemStyle: {
                    width: width / 2,
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
            );
          })}
        </Tab.Navigator>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
});
