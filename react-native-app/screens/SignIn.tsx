import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Keyboard, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, useColorScheme } from 'react-native';
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
                    <Text style={styles.text}> Email </Text>
                        <View style={styles.gap} />
                        <TextInput
                            style={styles.textInput}
                            placeholder='example@gmail.com'
                            placeholderTextColor='gray'
                            onChangeText={newText => setTextEmail(newText)}
                            defaultValue={textEmail}
                        />
                    <View style={styles.space} />
                    <Text style={styles.text}> Password </Text>
                    <View style={styles.gap} />
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry={true}
                        onChangeText={newText => setTextPassword(newText)}
                        defaultValue={textPassword}
                    />
                    <View style={styles.space} />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('TabGroup')}>
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>
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
            height: 45,
            borderWidth: 1,
            borderColor: '#19bfb7',
            borderRadius: 25,
            marginTop: 5,
            marginLeft: -10,
            marginRight: -10,
            paddingHorizontal: 17,
            color: colorScheme === 'light' ? 'black' : 'white',
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
        buttonText: {
            padding: 10,
            fontSize: 18,
            fontWeight: 'bold',
            color: '#19bfb7',
        },
    });
};
