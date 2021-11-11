// 将一维数组切换为二维数组
// import React from 'react';
// import {View, Text} from 'react-native';

type SliceFunction<T> = (array: Array<T>, step: number) => Array<Array<T>>;

export default function useSliceArray<T>(): SliceFunction<T> {
  const sliceArray: SliceFunction<T> = (array: Array<T>, step: number) => {
    let slicedArray: Array<Array<T>> = [];
    let index = 0;
    while (index < array.length) {
      slicedArray.push(array.slice(index, (index += step)));
    }
    return slicedArray;
  };
  return sliceArray;
}
