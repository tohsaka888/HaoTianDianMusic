import {createContext, MutableRefObject} from 'react';
import {ScrollView} from 'react-native';

type ScrollProps = {
  scrollRef: MutableRefObject<ScrollView | null | undefined>;
};

const ScrollContext = createContext<ScrollProps | null>(null);

export {ScrollContext};
