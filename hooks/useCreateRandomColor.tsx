// import React from 'react'
// import { View, Text } from 'react-native'
// 生成随机颜色
type CreateRandomColorFunction = () => string;

export default function useCreateRandomColor(): CreateRandomColorFunction {
  const createRandomColor: CreateRandomColorFunction = () => {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let color = 'rgba(' + r + ',' + g + ',' + b + ',0.8)';
    return color;
  };
  return createRandomColor;
}
