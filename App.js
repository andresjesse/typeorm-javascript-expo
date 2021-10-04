import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createConnection } from "typeorm";
import config from "./src/database/config";

import DemoComponent from "./src/components/DemoComponent";

export default function App() {
  const connect = React.useCallback(async () => {
    try {
      const connection = await createConnection(config);

      //---------------------------------------- DEMO CALLS

      // get all cars
      const cars = await connection.getRepository("Car").find();
      console.log(cars); // empty at first run

      //trying to find an invalid car
      const findCar99 = await connection
        .getRepository("Car")
        .findOne({ id: 99 });
      console.log(findCar99); // undefined (car 99 does not exists)

      //create cars
      await connection.getRepository("Car").save({
        brand: "vw",
        model: "fusca",
      });

      await connection.getRepository("Car").save({
        brand: "vw",
        model: "brasilia",
      });

      await connection.getRepository("Car").save({
        brand: "ford",
        model: "corcel",
      });

      await connection.getRepository("Car").save({
        brand: "ford",
        model: "f1000",
      });

      // get all cars
      const cars2 = await connection.getRepository("Car").find();
      console.log(cars2); // 4-cars array

      //trying to find car 2
      const findCar2 = await connection.getRepository("Car").findOne({ id: 2 });
      console.log(findCar2); // car 2 object

      //all cars with brand="ford"
      const findCarsFord = await connection
        .getRepository("Car")
        .find({ brand: "ford" });
      console.log(findCarsFord); // 2-cars array

      // update car with id=2
      await connection
        .getRepository("Car")
        .update(2, { brand: "bmw", model: "320i" });

      //find updated car
      const findCar2updated = await connection
        .getRepository("Car")
        .findOne({ id: 2 });
      console.log(findCar2updated); // car 2 updated object

      //delete car with id=2
      await connection.getRepository("Car").delete(2);

      //primise-based call example (same as get all cars)
      connection
        .getRepository("Car")
        .find()
        .then((cars) => {
          console.log(cars);
        });

      //---------------------------------------- END OF DEMO CALLS
    } catch (err) {
      console.log(err);
    }
  });

  React.useEffect(() => {
    connect();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Check outputs in the console!</Text>
      <StatusBar style="auto" />
      <DemoComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
