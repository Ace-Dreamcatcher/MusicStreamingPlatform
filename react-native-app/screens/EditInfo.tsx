import { StyleSheet, Keyboard, TextInput, TouchableOpacity, TouchableWithoutFeedback, useColorScheme, Pressable } from "react-native";
import { View, Text } from "../components/Theme";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useLayoutEffect, useState } from "react";
import { useAuth } from "../AuthContext";

export default function EditInfo() {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const colorScheme = useColorScheme();
    const styles = getStyles(colorScheme);
    const [textEmail, setTextEmail] = useState('');
    const [textUsername, setTextUsername] = useState('');
    const [textPassword, setTextPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Pressable onPress={() => navigation.goBack()}>
                    <Text>{'<'} Go Back</Text>
                </Pressable>
            ),
            headerRight: () => (
                <Pressable onPress={() => navigation.goBack()}>
                    <Text>Done</Text>
                </Pressable>
            ),
        });
    }, [navigation]);
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Text style={styles.text}> Email </Text>
                    <View style={styles.gap} />
                    <TextInput
                        style={styles.textInput}
                        placeholder='example@gmail.com'
                        placeholderTextColor='gray'
                        onChangeText={newText => {
                            setTextEmail(newText);
                            setEmailError('');
                        }}
                        defaultValue={textEmail}
                    />
                    <View style={styles.space} />
                    <Text style={styles.text}> Username </Text>
                    <View style={styles.gap} />
                    <TextInput
                        style={styles.textInput}
                        placeholder='user'
                        placeholderTextColor='gray'
                        onChangeText={newText => setTextUsername(newText)}
                        defaultValue={textUsername}
                    />
                    <View style={styles.space} />
                    <Text style={styles.text}> Password </Text>
                    <View style={styles.gap} />
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry={true}
                        onChangeText={newText => {
                            setTextPassword(newText);
                            setPasswordError('');
                        }}
                        defaultValue={textPassword}
                    />
                    <View style={styles.space} />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
    )
}

const getStyles = (colorScheme: string | null | undefined) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 25,
        },
        space: {
            height: 55,
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
        errorText: {
            marginTop: 5,
            marginLeft: 5,
            fontSize: 12,
            color: 'red',
        },
    });
};
