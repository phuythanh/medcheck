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
import { Service } from "typedi";

// @Authorized()
@Service()
@JsonController('/users')
export class UserController {
  @Get("")
  getAll() {
    return "This action returns all users";
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
