import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 12,
    paddingTop: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  item: {
    marginTop: 8,
    backgroundColor: "#3e82f0",
    height: 40,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 8,
    paddingRight: 8,
  },
  itemText: {
    color: "#FFF",
    flex: 1,
    width: "100%",
    textAlign: "left",
  },
  itemSubtext: {
    color: "#DDD",
    flex: 1,
    width: "100%",
    textAlign: "left",
    fontSize: 8,
  },
  input: {
    marginTop: 12,
    flexDirection: "row",
    display: "flex",
    height: 40,
  },
  inputText: {
    flex: 3,
    color: "#3e82f0",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3e82f0",
    marginRight: 10,
  },
  inputButton: {
    flex: 1,
    borderRadius: 8,
    color: "#FFF",
    backgroundColor: "#3e82f0",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
