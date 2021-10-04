import React from "react";
import { Text, Button } from "react-native";
import { getConnection } from "typeorm";

export default function DemoComponent() {
  const [data, setData] = React.useState("");

  const loadData = React.useCallback(async () => {
    const connection = getConnection();
    const car = await connection.getRepository("Car").findOne({ id: 1 });
    setData(`brand:${car.brand} model:${car.model}`);
  });

  return (
    <>
      <Button title="Load Data Inside a Component" onPress={loadData} />
      <Text>{data}</Text>
    </>
  );
}
