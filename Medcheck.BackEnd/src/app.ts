// this shim is required
import "reflect-metadata";
import {
  createExpressServer,
  useContainer as routingUseContainer,
} from "routing-controllers";
// import { UserController } from "./controllers/UserController";
import { Container } from "typedi";
import { createConnection } from "typeorm";
import { useContainer as ormUseContainer } from "typeorm";
import { Container as extensionsContainer } from "typeorm-typedi-extensions";
import { join } from "path";
import { User } from "./entity/User";
import { Category } from "./entity/Category";

routingUseContainer(Container);
ormUseContainer(Container);
ormUseContainer(extensionsContainer);

createConnection()
  .then(async (connection) => {
    // creates express app, registers all controller routes and returns you express app instance
    const app = createExpressServer({
      cors: true,
      routePrefix: "/api",
      // controllers: [UserController], // we specify controllers we want to use
      controllers: [join(__dirname, "/controllers/*.ts")],
    });

    // run express application on port 3000
    app.listen(3000);
    await connection.manager.save(
      connection.manager.create(User, {
        firstName: "Timber",
        lastName: "Saw",
      })
    );
    await connection.manager.save(
      connection.manager.create(User, {
        firstName: "Phantom",
        lastName: "Assassin",
      })
    );
    await connection.manager.save(
      connection.manager.create(Category, {
        title: "Phantom",
        description: "Assassin",
      })
    );
  })
  .catch((error) => console.log(error));
