import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import AccelerometerReadoutWidget from "./components/AccelerometerReadoutWidget";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <AccelerometerReadoutWidget />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
