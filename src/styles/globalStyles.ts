import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 12,
    paddingTop: 8,
    marginLeft: width > 600 ? width / 2 - 300 : 0,
    maxWidth: 600,
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
    paddingLeft: 8,
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
  centeredView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default styles;
