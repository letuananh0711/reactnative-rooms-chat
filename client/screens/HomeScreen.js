import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { setUserChat, getUserChatSelector } from '../reducers/userChatSlice';

export default function HomeScreen(props) {

  // create dispatch variable with useDispatch Hook
  const dispatch = useDispatch();

  // get userChat state from the store with useSelector Hook
  let {userChat} = useSelector(getUserChatSelector);

  //console.log(userChat);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <TextInput
        style={styles.input}
        onChangeText={text => dispatch(setUserChat({
          user: text,
          roomChat: "",
        }))}
        value={userChat.user}
        placeholder="Enter your pseudo"
      />
      <Button
        style={styles.btnLogin}
        title="Let's chat !"
        onPress={() => props.navigation.navigate('Room')}
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
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  btnLogin: {
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 20,
    height: 30,
    width: 100,
    textAlign: 'center',
  }
});
