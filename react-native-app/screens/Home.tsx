import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Theme';

export default function Home() {
    return (
        <View style={styles.container}>
            <Text> Home </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
