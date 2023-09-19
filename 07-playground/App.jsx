import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  LocationAccuracy,
} from "expo-location";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      try {
        // Request permission to access location. This will prompt the user for permission
        let { status } = await requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrMsg("Permission to access location was denied");
          return;
        }

        // Get the current location with high accuracy
        let location = await getCurrentPositionAsync({
          accuracy: LocationAccuracy.High,
        });
        setLocation(location);
      } catch (err) {
        setErrMsg("Error while fetching location");
        console.log(err);
      }
    };

    getLocation();
  }, []);

  console.log(location)

  const getData = () => {
    axios
      .get("https://gist.githubusercontent.com/Grayson-Orr/d72b53e4d5b094305b8303c9330908f0/raw")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const mapData = () => {
    return data.map((item) => (
      <Marker
        key={item.name}
        coordinate={{
          latitude: item.location.latitude,
          longitude: item.location.longitude,
        }}
        title={item.name}
        description={item.city}
        pinColor="yellow"
      />
    ));
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <MapView
          initialRegion={{
            latitude: 37.49209,
            longitude: -122.222378,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
          style={styles.map}
        >
          {mapData()}
          <Marker
        coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
        title={"You are here"}
        pinColor="blue"
      />
        </MapView>
      )}
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
