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
import { UserEntity } from "./entities/UserEntity";
import { authorizationChecker } from "./auth/authorizationChecker";
import { currentUserChecker } from "./auth/currentUserChecker";
import { hashPassword } from "./utils/common";

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
      authorizationChecker: authorizationChecker(),
      currentUserChecker: currentUserChecker(),
    });

    // run express application on port 3100
    // app.listen(3100);
    // const hasUser = await connection.manager.count(UserEntity, {
    //   email: "phuythanh@gmail.com",
    // });
    // if (!hasUser) {
    //   const hashPasswordValue = await hashPassword("123456");
    //   await connection.manager.save(
    //     connection.manager.create(UserEntity, {
    //       email: "phuythanh@gmail.com",
    //       password: hashPasswordValue,
    //     })
    //   );
    // }
  })
  .catch((error) => console.log(error));
