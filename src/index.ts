import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as config from "config";
import * as express from "express";
import { Container } from "typedi";
import * as TypeORM from "typeorm";
import { buildSchema } from "type-graphql";
import IContext from "./interface/context.interface";
import { authChecker, getUser } from "./lib/auth";

TypeORM.useContainer(Container);

const app = express();
const path = "/graphql";

(async () => {
  try {
    await TypeORM.createConnection({
      ...config.get("database"),
      cache: {
        type: "ioredis",
        options: config.get("cache"),
      },
      entities: [
        __dirname + "/entity/**/*.entity.[jt]s",
      ],
    });

    const schema = await buildSchema({
      resolvers: [
        __dirname + "/resolver/**/*.resolver.[jt]s",
      ],
      authChecker,
      authMode: "null",
      container: Container,
    });

    const server = new ApolloServer({
      schema,
      tracing: true,
      context: context => {
        return {
          ...context,
          user: getUser(context),
        } as IContext;
      },
    });

    server.applyMiddleware({ app, path });

    app.use((err, req, res, next) => {
      res.status(500).send(err);
    });

    app.listen({ port: config.get("port") }, () => {
      console.log(`🚀 Server ready at http://localhost:${config.get("port")}${server.graphqlPath}`);
    });
  } catch (e) {
    console.error(e);
  }
})();
