import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import {getCategroy} from '../../request/getCategroy';
import useSliceArray from '../../hooks/useSliceArray';
import useCreateRandomColor from '../../hooks/useCreateRandomColor';

export default function Category() {
  const [categroy, setCategroy] = useState<any[][]>();
  const sliceArray = useSliceArray();
  const width = useWindowDimensions().width;
  const createRandomColor = useCreateRandomColor();
  useEffect(() => {
    const getCategroyList = async () => {
      const data = await getCategroy();
      setCategroy(data);
      const slicedArray = sliceArray(data, 3);
      setCategroy(slicedArray);
    };
    getCategroyList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [0]);
  const height = StatusBar.currentHeight;
  return (
    <View>
      <View style={{height: height}} />
      <Text style={styles.title}>标签分类</Text>
      <ScrollView>
        {categroy?.map((item: any[], index: number) => {
          return (
            <View key={index}>
              <View style={styles.container}>
                {item.length &&
                  item.map((value: any, i: number) => {
                    return (
                      <View
                        key={i}
                        style={[
                          styles.category,
                          {
                            backgroundColor: createRandomColor(),
                            width: width / 3 - 20,
                            height: width / 3 - 20,
                          },
                        ]}>
                        <Text style={styles.name}>{value.name}</Text>
                      </View>
                    );
                  })}
              </View>
            </View>
          );
        })}
        <View style={styles.blank} />
      </ScrollView>
    </View>
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
