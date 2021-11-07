import React, {useContext} from 'react';
import {Modal, StyleSheet, ImageBackground} from 'react-native';
import {ComponentsContext, MusicInfoContext} from '../../context/MainContext';
import ModalTitle from '../Modal/ModalTitle';
import ModalContent from '../Modal/ModalContent';
import ModalFooter from '../Modal/ModalFooter';

export default function MusicDetailModal() {
  const props = useContext(ComponentsContext);
  const musicProps = useContext(MusicInfoContext);
  return (
    <Modal
      visible={props?.visible}
      animationType="slide"
      transparent={false}
      onRequestClose={() => {
        if (musicProps?.currentIndexRef) {
          musicProps.currentIndexRef.current = 0;
        }
        if (musicProps?.lyricRef) {
          musicProps.lyricRef.current = [];
        }
        props?.setVisible(false);
      }}>
      <ImageBackground
        blurRadius={100}
        source={{uri: musicProps?.musicInfo.picUrl}}
        imageStyle={styles.image}
        style={styles.background}>
        <ModalTitle />
        <ModalContent />
        <ModalFooter />
      </ImageBackground>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  image: {
    opacity: 0.8,
  },
});
