import React from 'react'
import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import CustomButton from './CustomButton'
import Icon from 'react-native-vector-icons/Ionicons'

interface Props {
  logout: () => void
  closeModal: () => void
  modalVisible: boolean
}

export function ModalOpener({ openModal }: { openModal: () => void }) {
  return (
    <TouchableOpacity style={styles.modalOpener} onPress={openModal}>
      <Icon name="settings-outline" size={30} color="#fff" />
    </TouchableOpacity>
  )
}

export default function SettingsModal({
  logout,
  closeModal,
  modalVisible
}: Props) {
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <Pressable style={styles.container} onPress={closeModal}>
          <View style={styles.buttonContainer}>
            <CustomButton text="LOGOUT" action={logout} />
          </View>
        </Pressable>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  buttonContainer: {
    width: '50%'
  },
  modalOpener: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 25
  }
})
