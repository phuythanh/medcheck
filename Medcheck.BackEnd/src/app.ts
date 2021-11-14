// this shim is required
import "reflect-metadata";
import {
  createExpressServer,
  getMetadataArgsStorage,
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
import { routingControllersToSpec } from "routing-controllers-openapi";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import * as swaggerUiExpress from "swagger-ui-express";
const { defaultMetadataStorage } = require("class-transformer/cjs/storage");

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
    // Parse class-validator classes into JSON Schema:
    const schemas = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: "#/components/schemas/",
    });
    // Parse routing-controllers classes into OpenAPI spec:
    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(
      storage,
      {
        controllers: [join(__dirname, "/controllers/*.ts")],
        routePrefix: "/api",
      },
      {
        components: {
          schemas,
          securitySchemes: {
            basicAuth: {
              scheme: "basic",
              type: "http",
            },
          },
        },
        info: {
          description: "Generated with `routing-controllers-openapi`",
          title: "A sample API",
          version: "1.0.0",
        },
      }
    );

    app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));

    // Render spec on root:
    app.get("/", (_req, res) => {
      res.json(spec);
    });

    // run express application on port 3100
    app.listen(3100);
    const hasUser = await connection.manager.count(UserEntity, {
      email: "phuythanh@gmail.com",
    });
    if (!hasUser) {
      const hashPasswordValue = await hashPassword("123456");
      await connection.manager.save(
        connection.manager.create(UserEntity, {
          email: "phuythanh@gmail.com",
          password: hashPasswordValue,
        })
      );
    }
  })
  .catch((error) => console.log(error));
