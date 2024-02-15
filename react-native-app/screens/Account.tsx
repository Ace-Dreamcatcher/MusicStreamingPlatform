import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { View, Text } from '../components/Theme';
import GestureRecognizer from 'react-native-swipe-gestures';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


export default function EditUser() {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    
    return (
        <GestureRecognizer style={{flex: 1}} onSwipeDown={() => navigation.goBack()}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Text>Account</Text>
                </View>
            </TouchableWithoutFeedback>
        </GestureRecognizer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})