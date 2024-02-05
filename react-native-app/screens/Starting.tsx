import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Theme';


export default function Starting() {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    
    return (
        // <View style={styles.container}>
        //     <View style={styles.padding}>
        //         <Image source={require('../assets/logo.png')} style={styles.image} />
        //     </View>
        //     <View style={styles.buttons}>
        //         <Button title='Sign Up' onPress={() => navigation.navigate('Sign Up')} />
        //         <View style={styles.space} />
        //         <Button title='Sign In' onPress={() => navigation.navigate('Sign In')} />
        //     </View>
        // </View>
        <View style={styles.container}>
            <View style={styles.padding}>
                <Image source={require('../assets/logo.png')} style={styles.image} />
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('Sign Up')}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.space} />
                <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('Sign In')}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // buttons: {
    //     flexDirection: 'row',
    // },
    // padding: {
    //     paddingBottom: 100,
    // },
    // logo: {
    //     width: 200,
    //     height: 100,
    //     marginBottom: 20,
    // },
    // space: {
    //     width: 50,
    // },
    // image: {
    //     width: 300,
    //     height: 300,
    //     resizeMode: 'contain',
    // }
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        flexDirection: 'row',
    },
    padding: {
        paddingBottom: 100,
    },
    logo: {
        width: 200,
        height: 100,
        marginBottom: 20,
    },
    space: {
        width: 50,
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    button: {
        borderWidth: 1,
        borderColor: '#19bfb7',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 15,
        backgroundColor: '#19bfb7',
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
    },
})


