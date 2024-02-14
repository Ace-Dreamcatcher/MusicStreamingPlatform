import { Button, StyleSheet } from 'react-native';
import { Text, View } from '../components/Theme';
import { useAuth } from '../AuthContext';


export default function Home() {
    const { onSignOut } = useAuth();
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
