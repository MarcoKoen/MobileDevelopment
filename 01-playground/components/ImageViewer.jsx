import { StyleSheet, Image } from "react-native";

const ImageViewer = (props) => {
  const imgSrc =
    props.selectedImg !== null
      ? { uri: props.selectedImg }
      : props.placeholderImgSrc;

  return <Image source={imgSrc} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
});

export default ImageViewer;