import { Button, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../components/Theme';
import { useAuth } from '../AuthContext';
import { useLayoutEffect } from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';


export default function Home() {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const { onSignOut } = useAuth();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={() => navigation.navigate('Account')}>
                    <FontAwesome name='user-circle-o' size={25} color='#19bfb7' style={{marginRight: 27}}/>
                </Pressable>
            ),
        });
    }, []);

    return (
        <View style={styles.container}>
            <Text> Home </Text>
            <Button title='Sign Out' onPress={onSignOut}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
