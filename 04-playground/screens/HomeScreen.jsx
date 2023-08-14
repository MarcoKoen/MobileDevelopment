import { SectionList, StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import nbaTeams from "../data/nbaTeams";

const HomeScreen = () => {
  const getTeamsByDivision = (division) =>
    nbaTeams.filter((team) => team.division === division);

  const renderSectionHeader = ({ section }) => (
    <Text style={styles.sectionHeader}>{section.title}</Text>
  );

  const sections = ["Atlantic", "Central", "Northwest", "Pacific", "Southeast", "Southwest"].map(division => {
    const teams = getTeamsByDivision(division);
    return {
      title: division,
      data: teams.map(team => ({
        ...team,
        img: team.img 
      }))
    };
  });
    
  const renderItem = ({ item }) => (
      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={item.img} style={{ width: 30, height: 30, marginRight: 10 }} />
        <Text style={styles.item}>{item.key}</Text>
      </TouchableOpacity>
    );
  
    console.log(sections);

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "lightgray",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default HomeScreen;