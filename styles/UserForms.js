import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    alignItems: "center",
    padding: 30,
  },
  header: {
    width: "100%",
    height: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 22,
    backgroundColor: "transparent",
  },
  logoIcon: {
    top: 20,
    width: 50,
    height: 50,
  },
  footer: {
    height: 100,
  },
  h1: {
    fontSize: 20,
    fontFamily: "ParkinsansMedium",
    color: "#000",
    marginTop: 40,
    marginBottom: 40,
  },
  h3: {
    alignSelf: "stretch",
    fontSize: 18,
    fontFamily: "NotoSansDisplayRegular",
    color: "#000",
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#F3773B",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginVertical: 10,
    color: "#282828",
    fontFamily: "NotoSansDisplayLight",
    fontSize: 16,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    height: 50,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#F3773B",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginVertical: 10,
    fontFamily: "NotoSansDisplayLight",
    fontSize: 16,
  },
  dateInput: {
    flex: 1,
    fontSize: 16,
    color: "#282828",
    width: "100%",
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  radioText: {
    fontSize: 16,
    fontFamily: "NotoSansDisplayLight",
    color: "#000",
    marginHorizontal: 10,
  },
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#F3773B",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginVertical: 10,
    width: "100%",
    fontFamily: "NotoSansDisplayLight",
    fontSize: 16,
  },
  inputFlex: {
    flex: 1,
    fontSize: 16,
    color: "#282828",
  },

  dropdown: {
    width: "100%",
    height: 50,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#F3773B",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginVertical: 10,
  },

  textInput: {
    borderWidth: 1,
    width: "100%",
    height: 300,
    borderColor: "#F3773B",
    borderRadius: 15,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginVertical: 10,
    color: "#282828",
    fontFamily: "NotoSansDisplayLight",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#F3773B",
    paddingTop: 10,
    borderRadius: 19,
    marginVertical: 40,
    alignItems: "center",
    width: "70%",
    height: 50,
  },
  text: {
    color: "white",
    fontFamily: "ParkinsansMedium",
    fontSize: 20,
  },

  input: {
    width: "100%",
    height: 50,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#F3773B",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginVertical: 10,
    color: "#282828",
    fontFamily: "NotoSansDisplayLight",
    fontSize: 16,
  },

  dateInputContainer: {
    width: "100%",
    height: 50,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#F3773B",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginVertical: 10,
    color: "#282828",
    fontFamily: "NotoSansDisplayLight",
    fontSize: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Aligne le contenu à droite
  },

  dateButton: {
    flex: 1,
    justifyContent: "center",
  },

  dateText: {
    color: "#A9A9A9",
    fontFamily: "NotoSansDisplayLight",
    fontSize: 16,
    textAlign: "left", // Aligne le texte à droite
  },
});
