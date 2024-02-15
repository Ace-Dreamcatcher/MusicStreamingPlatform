import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from "../components/Theme";
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';


export default function Library() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable>
                    <FontAwesome name='user-circle-o' size={25} color='#19bfb7' style={{marginRight: 27}}/>
                </Pressable>
            ),
        });
    }, []);
    
    return (
        <View style={styles.container}>
            <Text>Library</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
