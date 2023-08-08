import { FlatList, StyleSheet, Text, View } from "react-native";
import nbaTeams from "../data/nba-teams";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={nbaTeams}
        renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default HomeScreen;