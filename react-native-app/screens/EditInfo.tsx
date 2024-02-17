import { StyleSheet, Keyboard, TextInput, TouchableOpacity, TouchableWithoutFeedback, useColorScheme, Pressable, StatusBar, Alert } from "react-native";
import { View, Text } from "../components/Theme";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useLayoutEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditInfo() {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const colorScheme = useColorScheme();
    const backgroundColor = colorScheme === 'dark' ? 'black' : 'white';
    const statusBarStyle = colorScheme === 'dark' ? 'light-content' : 'dark-content';
    const styles = getStyles(colorScheme);
    const [textEmail, setTextEmail] = useState('');
    const [textUsername, setTextUsername] = useState('');
    const [textPassword, setTextPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { onUpdate, loadingState } = useAuth();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5}}>
                        <Ionicons name='arrow-back' size={24} color='#19bfb7' />
                        <Text style={{fontSize: 20, color: '#19bfb7'}}> Back</Text>
                    </View>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={handleUpdate}>
                    <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5}}>
                        <Text style={{fontSize: 20, color: '#19bfb7'}}>Done </Text>
                        <MaterialIcons name='done' size={24} color='#19bfb7' />
                    </View>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const handleUpdate = async () => {
        const token = (await AsyncStorage.getItem('accessToken')) || '';
        const response = await onUpdate!(textEmail, textUsername, textPassword, token);
        console.log(response.data)
        
        if (response.statusCode === 400) {
            const errorResponse = await response.message;
            if (errorResponse) {
                if (errorResponse[0].includes('Email') || errorResponse[0].includes('email')) {
                    setEmailError(errorResponse[0]);
                    console.log(errorResponse[0])
                } else if (errorResponse[0].includes('Password') || errorResponse[0].includes('password')) {
                    setPasswordError(errorResponse[0]);
                    console.log(errorResponse[0])
                }
            } else {
                throw new Error('Error updating user');
            }
        } else {
            navigation.goBack();
        }
    };
    
    return (
        <>
            <StatusBar barStyle={statusBarStyle} backgroundColor={backgroundColor} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Text style={styles.text}> Email </Text>
                    <View style={styles.gap} />
                    <TextInput
                        style={styles.textInput}
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
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </>
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
