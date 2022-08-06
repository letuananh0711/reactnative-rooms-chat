import { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, View, SafeAreaView, ScrollView, KeyboardAvoidingView, TouchableOpacity, } from 'react-native';
import { Input, Button } from 'react-native-elements'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import socketIOClient from "socket.io-client";
import { useSelector } from 'react-redux'
import { getUserChatSelector } from '../reducers/userChatSlice';
import { MessageChat } from '../components/MessageChat';

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
                'user': userChat.user,
                'room': userChat.roomChat,
            }
        });

        // send signal to join room to server
        //socket.current.emit('joinRoom', userChat.roomChat);

        // disconnect socket when component is unmounted
        return () => {
            socket.current.emit('quitRoom', userChat);
            socket.current.disconnect();
        }
    }, []);


    useEffect(() => {
        // receive message of the other user which was sent from server
        socket.current.on('serverMessage', (newMessage) => {
            let serverMessage = {};
            if (newMessage.userChat) {
                if (newMessage.userChat.user !== userChat.user) {
                    serverMessage.user = newMessage.userChat.user;
                    serverMessage.content = newMessage.currentMessage;
                }
            } else {
                serverMessage.user = 'System';
                serverMessage.content = newMessage;
            }
            if (serverMessage) {
                setListMessage([...listMessage, serverMessage]);
            }
        });

        // Fire the scroller to scroll to the end of ScrollView
        scrollRef.current.scrollToEnd({
            animated: true,
        });

        // unsubscribe the effect for socket 
        return () => socket.current.off('serverMessage');

    }, [listMessage]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={styles.container}
        >
                <SafeAreaView style={styles.container}>
                    <View style={{ padding: 24, flex: 1, justifyContent: "flex-end", }}>
                        {/* Create a ref for the ScrollView */}
                        <ScrollView ref={scrollRef} style={{ flex: 0.9, }}>
                            {
                                listMessage.map((message, i) =>
                                (
                                    <View key={`${i}-${message?.user}`}
                                        styles={{flex: 1,}}
                                    >
                                        <MessageChat
                                            message={message}
                                            isYoursMessage={message.user === userChat.user ? true : false}
                                        />
                                    </View>
                                ))
                            }
                        </ScrollView>
                        <View style={{ flex: 0.1, }}>
                            <View style={{ flex: 1, flexDirection: 'row'}}>
                                <TextInput
                                    style={{flex: 0.85, height: 40, width: '80%', marginRight: 10, padding: 10, borderWidth: 1, borderRadius: 10}}
                                    placeholder='Your message...'
                                    value={currentMessage}
                                    onChangeText={(text) => setCurrentMessage(text)}
                                />
                                <TouchableOpacity
                                    style={{flex: 0.15}}
                                    onPress={() => {
                                        socket.current.emit('clientMessage', { currentMessage: currentMessage, userChat: userChat });
                                        setListMessage([...listMessage, { user: userChat.user, content: currentMessage }]);
                                        setCurrentMessage('')
                                    }}>
                                    <FontAwesomeIcon name="send" size={30} color="blue" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
        </KeyboardAvoidingView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
