// import React from 'react';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 默认设置一天过期,最大容量为1000
export default function useStorge(
  size: number = 1000,
  defaultExpires: number | null = 1000 * 3600 * 24,
): Storage {
  const storage = new Storage({
    // 最大容量
    size: size,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: defaultExpires,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,

    // 你可以在构造函数这里就写好sync的方法
    // 或是在任何时候，直接对storage.sync进行赋值修改 重要
    // 或是写到另一个文件里，这里require引入
    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync方法，无缝返回最新数据。
    // sync方法的具体说明会在后文提到
    sync: () => {},
    // 使用trycatch处理错误也可以
  });

  return storage;
}
