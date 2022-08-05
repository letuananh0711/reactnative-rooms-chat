import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux'
import { setUserChat, getUserChatSelector } from '../reducers/userChatSlice';
// https://www.npmjs.com/package/react-native-select-dropdown
import SelectDropdown from 'react-native-select-dropdown';

export default function HomeScreen(props) {

  // States of the HomeScreen
  const [currentUser, setCurrentUser] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");

  // room types : Global , Amis and F
  const roomTypes = ["Global", "Friend", "Family"];

  // create dispatch variable with useDispatch Hook
  const dispatch = useDispatch();

  // get userChat state from the store with useSelector Hook
  let { userChat } = useSelector(getUserChatSelector);

  //console.log(userChat);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <TextInput
        style={styles.input}
        onChangeText={text => setCurrentUser(text)}
        value={currentUser}
        placeholder="Enter your pseudo"
      />
      <SelectDropdown
        defaultButtonText='Select a room'
        data={roomTypes}
        onSelect={(selectedItem, index) => setCurrentRoom(selectedItem)}
        buttonTextAfterSelection={(selectedItem, index) => selectedItem}
        rowTextForSelection={(item, index) => item}
        buttonStyle={styles.dropdown1BtnStyle}
        buttonTextStyle={styles.dropdownBtnTxtStyle}
        renderDropdownIcon={isOpened => {
          return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
        }}
        dropdownIconPosition={'right'}
        dropdownStyle={styles.dropdownDropdownStyle}
        rowStyle={styles.dropdownRowStyle}
        rowTextStyle={styles.dropdownRowTxtStyle}
      />
      <Button
        style={styles.btnGoToChat}
        title="Let's chat !"
        onPress={() => {
          dispatch(setUserChat({
            user: currentUser,
            roomChat: currentRoom,
          }));
          props.navigation.navigate('Chat');
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    margin: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    padding: 10,
  },
  dropdown1BtnStyle: {
    width: '80%',
    height: 50,
    margin: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',

  },
  btnGoToChat: {
    color: '#444',
    textAlign: 'left'
  },
  dropdownBtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdownDropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdownRowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdownRowTxtStyle: {color: '#444', textAlign: 'center'},

});
