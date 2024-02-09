import { StyleSheet } from 'react-native';
import { Text, View } from "../components/Theme";


export default function Search() {
    return (
        <View style={styles.container}>
            <Text>Search</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
