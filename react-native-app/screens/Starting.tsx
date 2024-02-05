import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Theme';


export default function Starting() {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    
    return (
        <View style={styles.container}>
            <View style={styles.padding}>
                <Image source={require('../assets/logo/logo.png')} style={styles.image} />
                <View style={styles.imagePosition}>
                    <Text style={styles.imageText}>Audio Alcove</Text>
                </View>
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
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        flexDirection: 'row',
    },
    padding: {
        paddingBottom: 250,
        paddingTop: 50,
    },
    logo: {
        width: 200,
        height: 100,
    },
    space: {
        width: 50,
    },
    image: {
        width: 375,
        height: 230,
        resizeMode: 'contain',
    },
    imagePosition: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageText: {
        fontSize: 22,
        fontWeight: '300',
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
