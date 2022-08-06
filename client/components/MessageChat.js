import { View, Text, StyleSheet } from "react-native";
import { format } from "timeago.js";

export function MessageChat({ message, isYoursMessage }) {


    return (
        <View style={isYoursMessage ? styles.containerRight : styles.containerLeft}>
            <Text style={isYoursMessage ? [styles.text, {color: '#FFFFFF'}] : [styles.text, {color: '050505'}]} >
                {message?.content}
            </Text>
            {!isYoursMessage 
                ? <Text style={isYoursMessage ? [styles.subText, {color: '#FFFFFF'}] : [styles.subText, {color: '050505'}]}>{message?.user}</Text>
                : <></>
            }
        </View>
    );

}
/*
#1877f2
#f5f1f1
*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerRight: {
        alignSelf: 'flex-end',
        backgroundColor: '#0084ff',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        maxWidth: '70%',
    },
    containerLeft: {
        alignSelf: 'flex-start',
        backgroundColor: '#E4E6EB',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        maxWidth: '70%',
    },
    text: {
        fontSize: 16,
    },
    subText: {
        fontSize: 12,
    },
});