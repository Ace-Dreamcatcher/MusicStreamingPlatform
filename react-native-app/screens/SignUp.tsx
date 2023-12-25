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
            <View style={styles.direction}>
                <Text> Email: </Text>
                <View style={styles.gap} />
                <TextInput
                    style={styles.textInput}
                    placeholder='example@gmail.com'
                    placeholderTextColor='gray'
                    onChangeText={newText => setTextEmail(newText)}
                    defaultValue={textEmail}
                />
            </View>
            <View style={styles.space} />
            <View style={styles.direction}>
                <Text> Username: </Text>
                <View style={styles.gap} />
                <TextInput
                    style={styles.textInput}
                    placeholder='user'
                    placeholderTextColor='gray'
                    onChangeText={newText => setTextUsername(newText)}
                    defaultValue={textUsername}
                />
            </View>
            <View style={styles.space} />
            <View style={styles.direction}>
                <Text> Password: </Text>
                <View style={styles.gap} />
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    onChangeText={newText => setTextPassword(newText)}
                    defaultValue={textPassword}
                />
            </View>
            <View style={styles.space} />
            <Button title='Sign Up' onPress={() => navigation.navigate('TabGroup')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        justifyContent: 'center',
    },
    space: {
        height: 100,
    },
    direction: {
        flexDirection: 'row',
    },
    textInput: {
        height: 20,
        borderWidth: 1,
        borderColor: 'gray',
        width: 200,
        //backgroundColor: 'gray',
    },
    gap: {
        width: 20,
    }
})
