import MapView , {Marker} from "react-native-maps";
import { StyleSheet, View } from "react-native";
import  axios  from "axios";

const App = () => {

  let data = "";
  const getData = () => {
    axios.get("https://gist.githubusercontent.com/Grayson-Orr/d72b53e4d5b094305b8303c9330908f0/raw")
    .then(res => {
      data = res.data;
      console.log(data)
    })
  }
  getData(); 

  const mapData = () => {
    const mappedData = data.map((item) => (
      <Marker
          key= {item.name}
          coordinate={{ latitude: item.location.latitude, longitude: item.location.longitude }}
          title={item.name}
          description={item.city}
        />
    ))
    return mappedData;
  }
  


  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
      >
        
      </MapView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default App;