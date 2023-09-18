import { Button, View, Text } from "react-native";

const HomeScreen = (props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Add Product"
        onPress={() => props.navigation.navigate("AddProduct")}
      />
    </View>
  );
};

export default HomeScreen;