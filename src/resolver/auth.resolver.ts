import { Resolver, Query } from "type-graphql";
import * as config from "config";
import * as jwt from "jsonwebtoken";
import IUser from "../interface/user.interface";

@Resolver()
class AuthResolver {
  @Query()
  token(): string {
    const payload = {
      id: "qwerty",
      roles: {
        // admin: true,
        property: [2],
      },
    } as IUser;

    return jwt.sign(payload, config.get("secret"), {
      expiresIn: "30m",
    });
  }
}
