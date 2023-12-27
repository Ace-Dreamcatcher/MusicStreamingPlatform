import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Text, View } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

export default function SignIn() {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    
    return (
        <GestureRecognizer style={{flex: 1}} onSwipeDown={() => navigation.goBack()}>
            <View>
                <Button title='Sign In' onPress={() => navigation.navigate('TabGroup')} />
            </View>
        </GestureRecognizer>
    )
}
