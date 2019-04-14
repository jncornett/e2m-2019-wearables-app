// @flow
import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { BleManager } from "react-native-ble-plx";
import DeviceList from "./components/DeviceList";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type AppState = "FINDING_DEVICES" | "CONNECTING_TO_DEVICE" | "RUNNING";

type Props = {};

type State = {
  messages: string[],
  devices: { [string]: * },
  state: AppState
};

const maxLogLines = 5;
const expectedDeviceName = "E2MMyowareDeviceHR";

export default class App extends Component<Props, State> {
  bleManager: *;

  state = {
    messages: [],
    devices: {},
    state: "FINDING_DEVICES"
  };

  logMessage = (msg: string) => {
    this.setState(prevState => {
      const nextMessages = [msg, ...prevState.messages];
      if (nextMessages.length > maxLogLines) {
        nextMessages.pop();
      }
      return { messages: nextMessages };
    });
  };

  addDevice = (dev: *) => {
    this.setState(prevState => ({
      devices: { ...prevState.devices, [dev.name]: dev }
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
            if (device.name === expectedDeviceName) {
              this.setState({ state: "CONNECTING_TO_DEVICE" });
              this.addDevice(device);
            }
          }
        );
      }
    });
  }

  render() {
    const devices = Array.from(Object.values(this.state.devices));
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>E2M Myoware Control Panel</Text>
        <DeviceList devices={devices} />
        <Text style={styles.instructions}>
          {this.state.messages.join("\n")}
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
