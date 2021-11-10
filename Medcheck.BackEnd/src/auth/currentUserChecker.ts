import { Action } from "routing-controllers";
import { UserEntity } from "../entities/UserEntity";

export function currentUserChecker(): (
  action: Action
) => Promise<UserEntity | undefined> {
  return async function innerCurrentUserChecker(
    action: Action
  ): Promise<UserEntity | undefined> {
    return action.request.user;
  };
}
