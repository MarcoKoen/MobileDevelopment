import { Button, View, Text, TextInput } from "react-native";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";

import database from "../config/firebase"; // Get a Firestore instance

const AddProductScreen = (props) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    createdAt: new Date(),
  });

  const onPress = async () => {
    // Add a new product to the Firestore database
    await addDoc(collection(database, "products"), newProduct);
    props.navigation.navigate("Home");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Add Product Screen</Text>
      <TextInput
        style={{
          width: 200,
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        onChangeText={(name) => setNewProduct({ ...newProduct, name })}
        placeholder="Name"
      />
      <TextInput
        keyboardType="numeric"
        style={{ width: 200, height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(price) =>
          setNewProduct({ ...newProduct, price: parseInt(price) })
        }
        placeholder="Price"
      />
      <Button title="Add Product" onPress={onPress} />
    </View>
  );
};

export default AddProductScreen;