import {createContext} from 'react';

type LoginProps = {
  visible: boolean;
  setVisible: Function;
};

const LoginContext = createContext<LoginProps | null>(null);

export {LoginContext};
