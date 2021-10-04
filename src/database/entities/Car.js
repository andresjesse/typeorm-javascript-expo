import { EntitySchema } from "typeorm";

const Car = new EntitySchema({
  name: "Car",
  tableName: "cars",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    brand: {
      type: "varchar",
    },
    model: {
      type: "varchar",
    },
  },
});

export default Car;
