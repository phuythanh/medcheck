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
import { CategoryService } from "../services/CategoryService";

export class CategoryResponse {
  public id: number;
  public title: string;
  public description: string;
}

// @Authorized()
@Service()
@JsonController("/Category")
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get("")
  @ResponseSchema(CategoryResponse, { isArray: true })
  getAll() {
    return this.categoryService.find();
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
