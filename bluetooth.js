import { BleManager } from "react-native-ble-plx";

export default function makeBluetoothService() {
  const manager = new BleManager();
  const listeners = {
    onScanDevice: []
  };
  manager.onStateChange(newState => {
    if (newState !== "PoweredOn") {
      return;
    }
    manager.startDeviceScan(
      null,
      {
        allowDuplicates: true
      },
      (error, device) => {
        listeners.onScanDevice.forEach(cb => cb(error, device));
      }
    );
  }, true);
  return {
    onScanDevice(fn) {
      listeners.onScanDevice.push(fn);
    }
  };
}
