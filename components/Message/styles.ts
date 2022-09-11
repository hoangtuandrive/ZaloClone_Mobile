import { StyleSheet } from "react-native";

const blue = "#3777f0";
const grey = "lightgrey";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3777f0",
    padding: 10,
    margin: 10,
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
    height: 45,
    width: 45,
    borderRadius: 25,
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    padding: 10,
  },
});

export default styles;
