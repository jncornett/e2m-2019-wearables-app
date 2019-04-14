// @flow

import React from "react";
import { FlatList, Text } from "react-native";

type Props = {
  devices: *[]
};

export default function DeviceList({ devices }: Props) {
  return (
    <FlatList
      data={devices.map(dev => ({ key: dev.id, device: dev }))}
      renderItem={({ item: { device } }) => (
        <>
          <Text>
            {JSON.stringify(
              {
                name: device.name,
                id: device.id,
                rssi: device.rssi,
                isConnectible: device.isConnectible
              },
              null,
              2
            )}
          </Text>
        </>
      )}
    />
  );
}
