import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import {getRandomMusic} from '../../request/HomePage';
import AreaRender from './AreaRender';
import {AreaContext} from '../../context/AreaContext';

type DataProps = {
  id: string;
  title: string;
  globalTheme: string | undefined;
};

const DATA = [
  {
    id: '0',
    title: '歌单推荐',
    globalTheme: '',
  },
  {
    id: '1',
    title: '人气歌曲',
    globalTheme: '',
  },
  {
    id: '2',
    title: '热门分类',
    globalTheme: '',
  },
];

export default function Content() {
  const [randomMusic, setRandomMusic] = useState([]);
  const [musicGroups, setMusicGroups] = useState<any[]>([]);
  const props = useContext(ThemeContext);
  const sliceMusicGroup = (data: any[]) => {
    let musicGroup = [];
    let index = 0;
    while (index < data.length) {
      musicGroup.push(data.slice(index, (index += 3)));
    }
    return musicGroup;
  };
  const pushRequest = useCallback(async () => {
    const data = await getRandomMusic();
    setRandomMusic(data);
    sliceMusicGroup(data);
    setMusicGroups(sliceMusicGroup(data));
  }, []);
  useEffect(() => {
    DATA.map((item: DataProps) => {
      item.globalTheme = props?.globalTheme;
    });
    pushRequest();
  }, [props?.globalTheme, pushRequest]);
  return (
    <AreaContext.Provider
      value={{
        musicData: randomMusic,
        setMusicData: setRandomMusic,
        musicGroups: musicGroups,
      }}>
      <FlatList
        data={DATA}
        renderItem={AreaRender}
        keyExtractor={item => item.id}
        style={styles.toBottom}
      />
    </AreaContext.Provider>
  );
}

const styles = StyleSheet.create({
  toBottom: {
    marginBottom: 70,
  },
});
