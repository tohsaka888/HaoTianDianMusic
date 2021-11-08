import React, {useContext} from 'react';
import {View, Text, Modal} from 'react-native';
import {LoginContext} from '../../context/LoginContext';

export default function LoginModal() {
  const loginProps = useContext(LoginContext);
  return (
    <Modal
      animationType="slide"
      visible={loginProps?.visible}
      onRequestClose={() => {
        loginProps?.setVisible(false);
      }}>
      <View></View>
    </Modal>
  );
}
