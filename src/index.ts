import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import * as config from "config";
import { Container } from "typedi";
import * as TypeORM from "typeorm";
import { buildSchema } from "type-graphql";
import { authChecker } from "./lib/authChecker";

TypeORM.useContainer(Container);

(async () => {
  try {
    await TypeORM.createConnection({
      ...config.get("database"),
      entities: [
        __dirname + "/entity/**/*.[jt]s",
      ],
    });

    const schema = await buildSchema({
      resolvers: [
        __dirname + "/resolver/**/*.[jt]s",
      ],
      authChecker,
      container: Container,
    });

    const server = new ApolloServer({
      schema,
      context: ctx => {
        return {
          ...ctx,
        };
      },
    });

    const { url } = await server.listen(config.get("port"));
    console.log(`Server is running, GraphQL Playground available at ${url}`);
  } catch (e) {
    console.error(e);
  }
})();
