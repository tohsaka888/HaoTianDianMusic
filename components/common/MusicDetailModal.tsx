import React, {useContext, useRef} from 'react';
import {Modal, StyleSheet, ImageBackground, FlatList} from 'react-native';
import {ComponentsContext, MusicInfoContext} from '../../context/MainContext';
import ModalTitle from '../Modal/ModalTitle';
import ModalContent from '../Modal/ModalContent';
import ModalFooter from '../Modal/ModalFooter';
import {ScrollContext} from '../../context/ScrollContext';

export default function MusicDetailModal() {
  const props = useContext(ComponentsContext);
  const musicProps = useContext(MusicInfoContext);
  const scrollRef = useRef<FlatList>();
  return (
    <Modal
      visible={props?.visible}
      animationType="slide"
      transparent={false}
      onRequestClose={() => {
        props?.setVisible(false);
      }}>
      <ImageBackground
        blurRadius={100}
        source={{uri: musicProps?.musicInfo.picUrl}}
        imageStyle={styles.image}
        style={styles.background}>
        <ScrollContext.Provider value={{scrollRef: scrollRef}}>
          <ModalTitle />
          <ModalContent />
          <ModalFooter />
        </ScrollContext.Provider>
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
