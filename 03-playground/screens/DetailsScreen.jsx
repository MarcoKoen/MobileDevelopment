import { useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailsScreen = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Call getData() function when the component mounts
  useEffect(() => {
    // if(loading === true){
    //     props.navigation.navigate("Loading");
    // }
    getData();
    setLoading(false);

  }, []);

  // Retrieve the person data from AsyncStorage
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("api_data");
      // If the person data exists
      if (value !== null) { 
        const parsedData = JSON.parse(value);
        setData(parsedData);
        console.log(data)
        
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
          <Text>Quiz: {data.firstName}</Text>
          <Text>Category: {data.lastName}</Text>
          <Text>Difficulty: {data.lastName}</Text>
          <Text>Type: {data.lastName}</Text>
          <Text>Question: {data.lastName}</Text>
          <Text>Answer: {data.lastName}</Text>
        </View>
      )}
      <Button title="Go back" onPress={() => props.navigation.goBack()} />
    </View>
  );
};

export default DetailsScreen;