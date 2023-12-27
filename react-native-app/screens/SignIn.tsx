import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button,StyleSheet } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Text, View } from '../components/Theme';

export default function SignIn() {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    
    return (
        <GestureRecognizer style={{flex: 1}} onSwipeDown={() => navigation.goBack()}>
            <View>
                <Button title='Sign In' onPress={() => navigation.navigate('TabGroup')} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
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