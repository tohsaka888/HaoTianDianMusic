import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import bak1 from '../../assets/images/bak1.jpg';
import {LoginContext} from '../../context/LoginContext';
// import {UserContext} from '../../context/UserContext';
import storage from '../../storage.config';

export default function LoginTitle() {
  const loginProps = useContext(LoginContext);
  // const userProps = useContext(UserContext);
  const [loginStatus, setLoginStatus] = useState<any>({});
  const statusBarHeight = StatusBar.currentHeight;
  useEffect(() => {
    const getLoginStatus = async () => {
      let data = await storage.load({
        key: 'loginStatus',
      });
      setLoginStatus(data);
    };
    getLoginStatus();
  }, []);
  return (
    <View>
      <View style={{marginTop: statusBarHeight}} />
      <View style={styles.container}>
        <Image
          source={loginStatus.avatarUrl ? {uri: loginStatus.avatarUrl} : bak1}
          style={styles.avatar}
        />
        {loginStatus.nickname ? (
          <Text style={[styles.username, styles.icon]}>
            {loginStatus.nickname}
          </Text>
        ) : (
          <>
            <Icon
              style={styles.icon}
              color={'white'}
              name={'right'}
              type="antdesign"
              tvParallaxProperties={undefined}
            />
            <Text
              style={styles.username}
              onPress={() => {
                loginProps?.setVisible(true);
              }}>
              请先登陆
            </Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },
  username: {
    fontSize: 20,
    flex: 1,
    color: 'white',
  },
  icon: {
    marginLeft: 16,
  },
});
