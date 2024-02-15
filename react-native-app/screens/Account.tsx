import { StyleSheet } from 'react-native';
import { View, Text } from '../components/Theme';


export default function EditUser() {
    return (
        <View style={styles.container}>
            <Text>User</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})