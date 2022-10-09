import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    // backgroundColor: "red",
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: "grey",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    color: "black",
    fontSize: 20,
    marginBottom: 3,
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
  },
  badgeContainer: {
    backgroundColor: "#FA3E3E",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 65,
    top: 65,
    borderWidth: 1,
    borderColor: "white",
  },
  badgeText: {
    color: "white",
    fontSize: 20,
  },
  bold: {
    fontWeight: "bold",
    color: "black",
  },
});

export default styles;
