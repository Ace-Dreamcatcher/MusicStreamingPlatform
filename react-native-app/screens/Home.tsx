import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, SafeAreaView, Text, View } from "react-native";

export default function Home() {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    return (
        <SafeAreaView>
            <View>
                <Button title="Sign In" onPress={() => navigation.navigate("Sign In")} />
                <Button title="Sign Up" onPress={() => navigation.navigate("Sign Up")} />
            </View>
        </SafeAreaView>
    )
}
