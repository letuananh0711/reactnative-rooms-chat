import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Input, Button } from 'react-native-elements'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import socketIOClient from "socket.io-client";
import { useSelector } from 'react-redux'
import { setUserChat, getUserChatSelector } from '../reducers/userChatSlice';

export default function ChatScreen(props) {

    // create socket ref
    const socket = useRef();

    // get userChat state in the store
    const { userChat } = useSelector(getUserChatSelector);

    // create a ref for scroller
    const scrollRef = useRef();

    // variables for the internal state of the component
    const [listMessage, setListMessage] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');

    useEffect(() => {
        // connect to the server socket with the extraHeaders which contain the room name
        socket.current = socketIOClient('http://192.168.0.169:3000/', {
            extraHeaders: {
                'room': userChat.roomChat,
            }
        });

        // send signal to join room to server
        //socket.current.emit('joinRoom', userChat.roomChat);

        // disconnect socket when component is unmounted
        return () => socket.current.disconnect();
    }, []);


    useEffect(() => {
        // receive message of the other user which was sent from server
        socket.current.on('serverMessage', (newMessage) => {
            setListMessage([...listMessage, { ...newMessage, currentMessage: newMessage }]);
        });

        // Fire the scroller to scroll to the end of ScrollView
        scrollRef.current.scrollToEnd({
            animated: true,
        });

        // unsubscribe the effect for socket 
        return () => socket.current.off('serverMessage');

    }, [listMessage]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            {/* Create a ref for the ScrollView */}
            <ScrollView ref={scrollRef}>
                {
                    listMessage.map((message, i) =>
                    (
                        <View key={i}>
                            <View>
                                <Text>Hi</Text>
                                <Text>John</Text>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <Input placeholder='Your message...'
                    value={currentMessage}
                    onChangeText={(text) => setCurrentMessage(text)}
                />
                <Button
                    title='Send'
                    onPress={() => {
                        socket.current.emit('sendMessage', { currentMessage: currentMessage, userChat: userChat });
                        setCurrentMessage('')
                    }}
                    icon={
                        <FontAwesomeIcon
                            name="envelope"
                            size={15}
                            color="white"
                        />
                    }
                    buttonStyle={styles.btnContainerSend}
                />
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    btnContainerSend: {
        backgroundColor: '#eb4d4b',
    },
});
