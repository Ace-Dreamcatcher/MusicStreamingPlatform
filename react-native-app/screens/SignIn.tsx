import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, useColorScheme } from 'react-native';
import { useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';

import { Text, View } from '../components/Theme';

export default function SignIn() {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const colorScheme = useColorScheme();
    const styles = getStyles(colorScheme);
    const [textEmail, setTextEmail] = useState('');
    const [textPassword, setTextPassword] = useState('');
    
    return (
        <GestureRecognizer style={{flex: 1}} onSwipeDown={() => navigation.goBack()}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Text style={styles.text}> Email: </Text>
                        <View style={styles.gap} />
                        <TextInput
                            style={styles.textInput}
                            onChangeText={newText => setTextEmail(newText)}
                            defaultValue={textEmail}
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
                    <View style={styles.buttonContainer}>
                        <Button title='Sign In' onPress={() => navigation.navigate('TabGroup')} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </GestureRecognizer>
    )
}

const getStyles = (colorScheme: string | null | undefined) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 25,
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
            color: colorScheme === 'light' ? 'black' : 'white',
            //backgroundColor: 'gray',
        },
        gap: {
            width: 20,
        },
        text: {
            fontSize: 17,
        },
        buttonContainer: {
            alignItems: 'center',
        },
    });
};
