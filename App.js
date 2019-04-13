import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import AccelerometerReadoutWidget from "./components/AccelerometerReadoutWidget";
import makeBluetoothService from "./bluetooth";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      scannedDevices: [],
      error: null,
      messages: []
    };
    this.logMessage = this.logMessage.bind(this);
  }

  logMessage(msg) {
    this.setState(prevState => ({
      messages: [msg, ...prevState.messages]
    }));
  }

  componentDidMount() {
    this.bluetoothService = makeBluetoothService();
    // this.bluetoothService.onScanDevice((error, device) => {
    //   if (error) {
    //     this.setState({ error });
    //     return;
    //   }
    //   this.logMessage(`Scanned device ${device.name}`);
    //   this.setState(prevState => ({
    //     scannedDevices: [device, ...prevState.scannedDevices]
    //   }));
    // });
  }

  render() {
    return (
      <View style={styles.container}>
        <AccelerometerReadoutWidget />
        <Text>{this.state.error}</Text>
        <Text>{this.state.messages}</Text>
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
