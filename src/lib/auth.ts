import { AuthChecker } from "type-graphql";
import * as config from "config";
import * as jwt from "jsonwebtoken";
import IContext from "../interface/context.interface";
import IUser from "../interface/user.interface";
import Property from "../entity/property.entity";

export const getToken = (context: IContext): string | null => {
  const authorization = context.req.headers.authorization;
  if (!authorization) {
    return null;
  }

  const token = authorization.split(" ");
  if (token.length > 1 && token[0] === "Bearer") {
    return token[1];
  }

  return null;
};

export const getUser = (context: IContext): IUser | null => {
  const token = getToken(context);
  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, config.get("secret")) as IUser;
  } catch (err) {
    console.warn("jwt error", err);
    return null;
  }
};

export const authChecker: AuthChecker<IContext> = ({ root, args, context, info }, roles) => {
  // console.log("authChecker", args, context.user, info.fieldName, roles);
  if (!context.user) {
    return false;
  }

  if (roles.length < 1) {
    return true;
  }

  if (roles.includes("ADMIN")) {
    return !!context.user.roles.admin;
  }

  if (roles.includes("PROPERTY")) {
    if (context.user.roles.admin) {
      return true;
    }

    if (!context.user.roles.property) {
      return false;
    }

    if (root && root instanceof Property) {
      return context.user.roles.property.includes(root.id);
    } else if (args.propertyId) {
      return context.user.roles.property.includes(args.propertyId);
    }

    return false;
  }

  return false;
};
