import { IsNotEmpty } from "class-validator";
import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Authorized,
  CurrentUser,
} from "routing-controllers";
import { ResponseSchema } from "routing-controllers-openapi";
import { Service } from "typedi";
import { CategoryEntity } from "../entities/CategoryEntity";
import { UserEntity } from "../entities/UserEntity";
import { CategoryService } from "../services/CategoryService";

export class CategoryResponse {
  public id: number;
  public title: string;
  public description: string;
}

export class CategoryRequest {
  @IsNotEmpty()
  public title: string;
  @IsNotEmpty()
  public description: string;
}

@Authorized()
@Service()
@JsonController("/Category")
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get("")
  @ResponseSchema(CategoryResponse, { isArray: true })
  getAll(@CurrentUser() user: UserEntity) {
    return this.categoryService.findByUser(user);
  }

  @ResponseSchema(CategoryResponse)
  @Get("/:id")
  getOne(@Param("id") id: number): Promise<CategoryResponse> {
    return this.categoryService.findOne(id);
  }

  @Post("")
  @ResponseSchema(CategoryResponse)
  post(@Body() request: CategoryRequest, @CurrentUser() user: UserEntity) {
    const category: CategoryEntity = {
      id: 0,
      ...request,
      userId: user.id,
    };
    return this.categoryService.create(category);
  }

  @Put("/:id")
  put(
    @Param("id") id: number,
    @Body() request: CategoryRequest,
    @CurrentUser() user: UserEntity
  ): Promise<CategoryResponse> {
    const category: CategoryEntity = {
      id: 0,
      ...request,
      userId: user.id,
    };
    return this.categoryService.update(id, category);
  }

  @Delete("/:id")
  async remove(@Param("id") id: number): Promise<boolean> {
    await this.categoryService.delete(id);
    return true;
  }
}
