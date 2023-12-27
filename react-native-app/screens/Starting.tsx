import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, StyleSheet } from 'react-native';
import { View } from '../components/Theme';

export default function Starting() {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    
    return (
        <View style={styles.container}>
            <Button title='Sign Up' onPress={() => navigation.navigate('Sign Up')} />
            <View style={styles.space} />
            <Button title='Sign In' onPress={() => navigation.navigate('Sign In')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    logo: {
        width: 200,
        height: 100,
        marginBottom: 20,
    },
    space: {
        width: 50,
    }
})
