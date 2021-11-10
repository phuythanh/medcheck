import { Action } from "routing-controllers";
import * as jwt from "jsonwebtoken";

export function authorizationChecker(): (
  action: Action,
  roles: any[]
) => Promise<boolean> | boolean {
  return async function innerAuthorizationChecker(
    action: Action,
    roles: string[]
  ): Promise<boolean> {
    const token = action.request.headers["authorization"];
    let key = jwt.verify(token, "secretkey");

    if (key) {
      action.request.user = key;
      return true;
    }

    return false;
  };
}
