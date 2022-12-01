import { StyleSheet } from "react-native";

const blue = "#3777f0";
const grey = "lightgrey";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3777f0",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: "70%",
  },
  leftContainer: {
    backgroundColor: grey,
    marginLeft: 10,
    marginRight: "auto",
    color: "red",
  },
  rightContainer: {
    backgroundColor: blue,
    marginLeft: "auto",
    marginRight: 10,
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginTop: 15,
    marginLeft: 5,
  },
  imageRight: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginTop: 15,
    marginRight: 5,
  },
  row: {
    flexDirection: "row",
  },
  containerCamera: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default styles;
