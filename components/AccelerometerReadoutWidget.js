import React, { Component } from "react";
import { Text, Button } from "react-native";
import { Accelerometer } from "expo";

const normalizer = () => {
  let max = null,
    min = null;
  const normalize = n => {
    if (max == null || n > max) {
      max = n;
    }
    if (min == null || n < min) {
      min = n;
    }
    return (n - min) / (max - min);
  };
  normalize.max = () => max;
  normalize.min = () => min;
  normalize.range = () => max - min;
  normalize.reset = () => {
    max = null;
    min = null;
  };
  return normalize;
};

export default class AccelerometerReadoutWidget extends Component {
  constructor(props) {
    super(props);
    this.normalizeX = normalizer();
    this.normalizeY = normalizer();
    this.normalizeZ = normalizer();
    this.state = { reading: null };
  }

  componentDidMount() {
    Accelerometer.setUpdateInterval(this.props.updateIntervalMs || 0);
    Accelerometer.addListener(obj => {
      this.setState({ reading: obj });
    });
  }

  componentWillUnmount() {
    Accelerometer.removeAllListeners();
  }

  render() {
    if (!this.state.reading) {
      return (
        <>
          <Text>Readout: {this.state.reading}</Text>
        </>
      );
    }
    const { x, y, z } = this.state.reading;
    const nx = this.normalizeX(x);
    const ny = this.normalizeY(y);
    const nz = this.normalizeZ(z);
    const renderDots = n => {
      const maxDots = 20;
      const dotString = ".";
      const numDots = Math.floor(n * maxDots);
      return dotString.repeat(numDots);
    };
    const isDebug = !!this.props.debug;
    return (
      <>
        {isDebug && (
          <Text>
            x = {nx.toFixed(2)} min = {this.normalizeX.min().toFixed(2)} max ={" "}
            {this.normalizeX.max().toFixed(2)} range ={" "}
            {this.normalizeX.range().toFixed(2)}
          </Text>
        )}
        <Text>{renderDots(nx)}</Text>
        {isDebug && (
          <Text>
            y = {ny.toFixed(2)} min = {this.normalizeY.min().toFixed(2)} max ={" "}
            {this.normalizeY.max().toFixed(2)} range ={" "}
            {this.normalizeY.range().toFixed(2)}
          </Text>
        )}
        <Text>{renderDots(ny)}</Text>
        {isDebug && (
          <Text>
            z = {nx.toFixed(2)} min = {this.normalizeZ.min().toFixed(2)} max ={" "}
            {this.normalizeZ.max().toFixed(2)} range ={" "}
            {this.normalizeZ.range().toFixed(2)}
          </Text>
        )}
        <Text>{renderDots(nz)}</Text>
        <Button
          title="Reset"
          onPress={() => {
            this.normalizeX.reset();
            this.normalizeY.reset();
            this.normalizeZ.reset();
          }}
        >
          Reset
        </Button>
      </>
    );
  }
}
