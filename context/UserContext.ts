import {createContext} from 'react';

type UserProps = {
  profile: any;
  setProfile: Function;
};

const UserContext = createContext<UserProps | null>(null);

export {UserContext};
