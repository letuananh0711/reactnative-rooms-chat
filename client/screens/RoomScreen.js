import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { setUserChat, getUserChatSelector } from '../reducers/userChatSlice';
// https://www.npmjs.com/package/react-native-select-dropdown
import SelectDropdown from 'react-native-select-dropdown';

export default function RoomScreen(props) {

  // room types : Global , Amis and F
  const roomTypes = ["Global", "Friend", "Family"];

  // create dispatch variable with useDispatch Hook
  const dispatch = useDispatch();

  // get userChat state from the store with useSelector Hook
  const {userChat} = useSelector(getUserChatSelector);
  
  useEffect(() => {

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text>Hi {userChat.user}!</Text>
      <SelectDropdown 
        defaultButtonText='Select a room'
        data={roomTypes}
        onSelect={(selectedItem, index) => {
          dispatch(setUserChat({
            user: userChat.user,
            roomChat: selectedItem,
          }));
        }}
        buttonTextAfterSelection={(selectedItem, index) => selectedItem}
        rowTextForSelection={(item, index) => item}
      />
      <Button
        style={styles.btnLogin}
        title="Go to room"
        onPress={() => props.navigation.navigate('Chat')}
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
});
