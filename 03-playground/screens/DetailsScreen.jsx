import { useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailsScreen = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  // Call getData() function when the component mounts
  useEffect(() => {
    if(loading === true){
        props.navigation.navigate("Loading");
    }
    
    getData();
  }, []);

  // Retrieve the person data from AsyncStorage
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("api_fetch");
      const parsedData = JSON.parse(value);
      setData(parsedData)
      url = `https://opentdb.com/api.php?amount=1&category=${parsedData.selectedCategory}&difficulty=${parsedData.selectedDifficulty}&type=${parsedData.selectedType}`
      // If the person data exists
      if (value !== null) { 
          fetch(url)
            .then((resp) => resp.json())
            .then((json) => {
              setData(json.results[0])
            })
            .catch((error) => console.error(error))
            .finally(() => {setLoading(false)
                props.navigation.navigate("Details");
                
            });
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
          <Text>Category: {data.category}</Text>
          <Text>Difficulty: {data.difficulty}</Text>
          <Text>Type: {data.type}</Text>
          <Text>Question: {data.question}</Text>
          <Text>Answer: {data.correct_answer}</Text>
        </View>
      )}
      <Button title="Go back" onPress={() => props.navigation.goBack()} />
    </View>
  );
};

export default DetailsScreen;