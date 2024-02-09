import { StyleSheet } from 'react-native';
import { Text, View } from "../components/Theme";


export default function Library() {
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
