// @flow
import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { BleManager } from "react-native-ble-plx";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};

type State = {
  messages: string[],
  devices: { [string]: boolean }
};

export default class App extends Component<Props, State> {
  bleManager: *;

  state = {
    messages: [],
    devices: {}
  };

  logMessage = (msg: string) => {
    this.setState(prevState => ({
      messages: [msg, ...prevState.messages]
    }));
  };

  addDevice = (name: string) => {
    this.setState(prevState => ({
      devices: { ...prevState.devices, [name]: true }
    }));
  };

  componentDidMount() {
    this.bleManager = new BleManager();
    this.bleManager.onStateChange(state => {
      this.logMessage(state);
      if (state === "PoweredOn") {
        this.bleManager.startDeviceScan(
          null,
          { allowDuplicates: true },
          (error, device) => {
            if (error) {
              this.logMessage(error);
              return;
            }
            if (device.name != null) {
              Array.from(Object.keys(device)).forEach(k => this.addDevice(k));
              this.addDevice(device.name);
              this.addDevice(device.id);
            }
          }
        );
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to xyzReact Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.instructions}>
          {this.state.messages.join("\n")}
        </Text>
        <Text style={styles.instructions}>
          {Array.from(Object.keys(this.state.devices)).join("\n")}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
