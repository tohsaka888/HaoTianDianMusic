import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, StatusBar, useWindowDimensions} from 'react-native';
import {getCategroy} from '../../request/getCategroy';
import useSliceArray from '../../hooks/useSliceArray';
import useCreateRandomColor from '../../hooks/useCreateRandomColor';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const Detail = ({item}: {item: any}) => {
  return <Text>{item.name}</Text>;
};

// const arr = [1, 2, 3];

export default function Category() {
  const [categroy, setCategroy] = useState<any[]>();
  // 弃用旧分类方案
  // const sliceArray = useSliceArray();
  // const width = useWindowDimensions().width;
  // const createRandomColor = useCreateRandomColor();
  useEffect(() => {
    const getCategroyList = async () => {
      const data = await getCategroy();
      setCategroy(data);
      // const slicedArray = sliceArray(data, 3);
      // setCategroy(slicedArray);
    };
    getCategroyList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [0]);
  const height = StatusBar.currentHeight;
  return (
    <>
      {categroy && (
        <Tab.Navigator>
          {categroy &&
            categroy.map((item, index) => {
              return (
                <Tab.Screen
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
                  name={item.name}
                  key={index}
                  children={() => {
                    return <Detail key={index} item={item} />;
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 18,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-around',
  },
  category: {
    // flex: 1,
    margin: 10,
    // padding: 8,
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: '#cecece',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 5,
    shadowOpacity: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: '#cecece',
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 1,
  },
  blank: {
    height: 70,
  },
});
