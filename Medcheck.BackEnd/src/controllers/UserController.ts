import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Authorized,
} from "routing-controllers";
import { ResponseSchema } from "routing-controllers-openapi";
import { Service } from "typedi";
import { UserService } from "../services/UserService";

export class UserResponse {
  public id: number;
  public email: string;
}

// @Authorized()
@Service()
@JsonController("/users")
export class UserController {
  constructor(private userService: UserService) {}
  @Get("")
  @ResponseSchema(UserResponse, { isArray: true })
  getAll() {
    const users = this.userService.find();
    return users;
  }

  @Get("/:id")
  getOne(@Param("id") id: number) {
    return "This action returns user #" + id;
  }

  @Post("")
  post(@Body() user: any) {
    return "Saving user...";
  }

  @Put("/:id")
  put(@Param("id") id: number, @Body() user: any) {
    return "Updating a user...";
  }

  @Delete("/:id")
  remove(@Param("id") id: number) {
    return "Removing user...";
  }
}
