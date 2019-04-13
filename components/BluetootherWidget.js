import React, { Component } from "react";
import { BleManager } from "react-native-ble-plx";

export default class BluetootherWidget extends Component {
  constructor(props) {
    super(props);
    this.bleManager = new BleManager();
  }
}
