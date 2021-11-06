import {createContext, MutableRefObject} from 'react';
import {FlatList} from 'react-native';

type ScrollProps = {
  scrollRef: MutableRefObject<FlatList | null | undefined>;
};

const ScrollContext = createContext<ScrollProps | null>(null);

export {ScrollContext};
