import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import bak1 from '../../assets/images/bak1.jpg';
import {LoginContext} from '../../context/LoginContext';

export default function LoginTitle() {
  const loginProps = useContext(LoginContext);
  return (
    <View>
      <View style={styles.container}>
        <Image source={bak1} style={styles.avatar} />

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
