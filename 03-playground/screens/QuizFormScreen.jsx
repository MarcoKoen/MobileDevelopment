import { useState } from "react";
import { Button, View, Text, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Picker} from '@react-native-picker/picker';

const QuizScreen = (props) => {
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedDifficulty, setSelectedDifficulty] = useState();
    const [selectedType, setSelectedType] = useState();
  
    const storePersonData = async () => {
        try {
          const data = { selectedCategory, selectedDifficulty, selectedType };
    
          // Store the data in AsyncStorage
          await AsyncStorage.setItem("api_fetch", JSON.stringify(data));
          
    
        } catch (err) {
          console.log(err);
        }
      };

  return (
    <>
    <Text>Quiz Form Screen</Text>
    <Text>Category:</Text>
    <Picker
    selectedValue={selectedCategory}
    onValueChange={(itemValue, itemIndex) =>
        setSelectedCategory(itemValue)
    }>
    <Picker.Item label="Select Category" />
    <Picker.Item label="General Knowledge" value="9" />
    <Picker.Item label="Entertainment: Books" value="10" />
    <Picker.Item label="Entertainment: Film" value="11" />
    <Picker.Item label="Entertainment: Music" value="12" />
    </Picker>
    

    <Text>Difficulty:</Text>
    <Picker
    selectedValue={selectedDifficulty}
    onValueChange={(itemValue, itemIndex) =>
    setSelectedDifficulty(itemValue)
    }>
    <Picker.Item label="Select Difficulty" />
    <Picker.Item label="Easy" value="easy" />
    <Picker.Item label="Medium" value="medium" />
    <Picker.Item label="Hard" value="hard" />
    </Picker>

    <Text>Type:</Text>
    <Picker
    selectedValue={selectedType}
    onValueChange={(itemValue, itemIndex) =>
    setSelectedType(itemValue)
    }>
    <Picker.Item label="Select Type" />
    <Picker.Item label="Multiple Choice" value="multiple" />
    <Picker.Item label="True / False" value="boolean" />
    </Picker>
    <Button title="Create Quiz" onPress={() => {
          storePersonData();
          props.navigation.navigate("Details");
        }} />
    </>

  );
};

export default QuizScreen;