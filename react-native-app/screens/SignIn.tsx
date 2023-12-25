import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Text, View } from 'react-native';

export default function SignIn() {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    
    return (
        <View>
            <Button title='Sign In' onPress={() => navigation.navigate('TabGroup')} />
        </View>
    )
}
