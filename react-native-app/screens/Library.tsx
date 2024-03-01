import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Theme";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import MusicPlayer from "./MusicPlayer";

export default function Library() {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Account")}>
          <FontAwesome
            name="user-circle-o"
            size={25}
            color="#19bfb7"
            style={{ marginRight: 27 }}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text>Library</Text>
      </View>
      <MusicPlayer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
