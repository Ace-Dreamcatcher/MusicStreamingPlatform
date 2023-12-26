import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function SignUp() {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const [textEmail, setTextEmail] = useState('');
    const [textUsername, setTextUsername] = useState('');
    const [textPassword, setTextPassword] = useState('');

    return (
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