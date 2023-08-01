import { useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DisplayQuiz = (props) => {
  const [data, setData] = useState(null);

  // Call getData() function when the component mounts
  useEffect(() => {
    getData();
  }, []);

  // Retrieve the person data from AsyncStorage
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("person_data");
      // If the person data exists
      if (value !== null) { 
        const parsedData = JSON.parse(value);
        setData(parsedData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      {data && (
        <View>
          <Text>First Name: {data.firstName}</Text>
          <Text>Last Name: {data.lastName}</Text>
        </View>
      )}
      <Button title="Go back" onPress={() => props.navigation.goBack()} />
    </View>
  );
};

export default DetailsScreen;