import React, {useState} from 'react';
// import {View, Text} from 'react-native';
import LoginTitle from './LoginTitle';
import LoginContent from './LoginContent';
import LoginModal from './LoginModal';
import {LoginContext} from '../../context/LoginContext';

export default function Login() {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <LoginContext.Provider value={{visible: visible, setVisible: setVisible}}>
      <LoginTitle />
      <LoginContent />
      <LoginModal />
    </LoginContext.Provider>
  );
}
