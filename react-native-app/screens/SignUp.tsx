import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Text, View } from '../components/Theme';

export default function SignUp() {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const [textEmail, setTextEmail] = useState('');
    const [textUsername, setTextUsername] = useState('');
    const [textPassword, setTextPassword] = useState('');

    return (
        <GestureRecognizer style={{flex: 1}} onSwipeDown={() => navigation.goBack()}>
            <View style={styles.container}>
                <Text style={styles.text}> Email: </Text>
                <View style={styles.gap} />
                <TextInput
                    style={styles.textInput}
                    placeholder='example@gmail.com'
                    placeholderTextColor='gray'
                    onChangeText={newText => setTextEmail(newText)}
                    defaultValue={textEmail}
                />
                <View style={styles.space} />
                <Text style={styles.text}> Username: </Text>
                <View style={styles.gap} />
                <TextInput
                    style={styles.textInput}
                    placeholder='user'
                    placeholderTextColor='gray'
                    onChangeText={newText => setTextUsername(newText)}
                    defaultValue={textUsername}
                />
                <View style={styles.space} />
                <Text style={styles.text}> Password: </Text>
                <View style={styles.gap} />
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    onChangeText={newText => setTextPassword(newText)}
                    defaultValue={textPassword}
                />
                <View style={styles.space} />
                <Button title='Sign Up' onPress={() => navigation.navigate('TabGroup')} />
            </View> 
        </GestureRecognizer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    space: {
        height: 100,
    },
    textInput: {
        height: 25,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        //backgroundColor: 'gray',
    },
    gap: {
        width: 20,
    },
    text: {
        fontSize: 17,
    }
})
