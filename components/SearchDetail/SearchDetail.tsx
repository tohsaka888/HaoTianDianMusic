import React, {useContext} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {SearchContext} from '../../context/SearchContext';
import SearchTitle from './SearchTitle';

export default function SearchDetail() {
  const seachProps = useContext(SearchContext);
  return (
    <View>
      <SearchTitle />
      <ScrollView>
        {seachProps?.result &&
          seachProps.result.map((item: any, index: number) => {
            return (
              <View key={index} style={styles.container}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={styles.title} numberOfLines={2}>
                  {item.ar.map((value: string) => {
                    return value;
                  })}
                </Text>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    flex: 1,
  },
  container: {
    padding: 10,
  },
});
