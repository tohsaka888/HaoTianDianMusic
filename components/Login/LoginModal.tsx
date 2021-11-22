import React, {useCallback, useContext, useState} from 'react';
import {
  View,
  Text,
  Modal,
  ImageBackground,
  StyleSheet,
  TextInput,
  StatusBar,
} from 'react-native';
import {LoginContext} from '../../context/LoginContext';
import login2 from '../../assets/images/login2.jpg';
import {Button, Icon} from 'react-native-elements';
import {setLogin} from '../../request/login';
import {UserContext} from '../../context/UserContext';
import {Toast} from '@ant-design/react-native';
import storage from '../../storage.config';

const ModalTitle = () => {
  const loginProps = useContext(LoginContext);
  const statusBarHeight = StatusBar.currentHeight;
  return (
    <>
      <View style={{marginTop: statusBarHeight}} />
      <View style={styles.titleContainer}>
        <Icon
          type="antdesign"
          name="down"
          tvParallaxProperties={undefined}
          color="white"
          onPress={() => {
            loginProps?.setVisible(false);
          }}
        />
        <Text style={styles.titleText}>登录</Text>
      </View>
    </>
  );
};

const ModalContent = () => {
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const userProps = useContext(UserContext);
  const loginProps = useContext(LoginContext);
  // 不传值默认设置一天过期,最大存储1000条数据
  const login = useCallback(async () => {
    const loginStatus = await setLogin(phone, password);
    if (loginStatus.nickname) {
      Toast.success('登陆成功');
      storage.save({
        key: 'loginStatus',
        data: loginStatus,
        expires: null,
      });
      loginProps?.setVisible(false);
      userProps?.setProfile(true);
    } else {
      Toast.fail('登陆失败');
      userProps?.setProfile(false);
    }
    userProps?.setProfile(loginStatus);
  }, [loginProps, password, phone, userProps]);

  return (
    <View style={styles.contentContainer}>
      <View style={styles.inputArea}>
        <Text style={styles.label}>手机号:</Text>
        <TextInput
          dataDetectorTypes="phoneNumber"
          placeholder="请输入手机号"
          placeholderTextColor={'#cecece'}
          textAlign="left"
          style={styles.input}
          underlineColorAndroid="#00eeff"
          onChangeText={(text: string) => {
            setPhone(text);
          }}
        />
      </View>
      <View style={styles.inputArea}>
        <Text style={styles.label}>密码:</Text>
        <TextInput
          placeholder="请输密码"
          placeholderTextColor={'#cecece'}
          secureTextEntry={true}
          textAlign="left"
          style={styles.input}
          underlineColorAndroid="#00eeff"
          onChangeText={(text: string) => {
            setPassword(text);
          }}
        />
      </View>
      <View style={styles.buttonArea}>
        <Button
          title={'登陆'}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={login}
        />
      </View>
    </View>
  );
};

export default function LoginModal() {
  const loginProps = useContext(LoginContext);
  return (
    <Modal
      animationType="slide"
      visible={loginProps?.visible}
      presentationStyle={'fullScreen'}
      statusBarTranslucent={true}
      onRequestClose={() => {
        loginProps?.setVisible(false);
      }}>
      <ImageBackground
        source={login2}
        imageStyle={styles.image}
        style={styles.background}>
        <View>
          <ModalTitle />
          <ModalContent />
        </View>
      </ImageBackground>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  image: {
    opacity: 1,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  titleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 36,
    backgroundColor: '#cecece2d',
    paddingTop: 16,
    paddingBottom: 16,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 10,
  },
  inputArea: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 8,
  },
  label: {
    flex: 1,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  input: {
    flex: 5,
  },
  buttonArea: {
    width: '96%',
  },
  button: {
    borderRadius: 20,
    marginLeft: '2%',
    marginRight: '2%',
    marginTop: 5,
  },
  buttonTitle: {
    textAlign: 'center',
  },
});
