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
import { ExpenseEntity } from "../entities/ExpenseEntity";
import { UserEntity } from "../entities/UserEntity";
import { ExpenseService } from "../services/ExpenseService";

export class ExpenseResponse {
  public id: number;
  public title: string;
  public date: Date;
  public value: number;
  public userId: number;
  public categoryId: number;
}

export class ExpenseRequest {
  @IsNotEmpty()
  public title: string;
  @IsNotEmpty()
  public date: Date;
  @IsNotEmpty()
  public value: number;
  @IsNotEmpty()
  public categoryId: number;
}

@Authorized()
@Service()
@JsonController("/Expense")
export class ExpenseController {
  constructor(private ExpenseService: ExpenseService) {}
  @Get("")
  @ResponseSchema(ExpenseResponse, { isArray: true })
  getAll(@CurrentUser() user: UserEntity) {
    return this.ExpenseService.findByUser(user);
  }

  @ResponseSchema(ExpenseResponse)
  @Get("/:id")
  getOne(@Param("id") id: number): Promise<ExpenseResponse> {
    return this.ExpenseService.findOne(id);
  }

  @Post("")
  @ResponseSchema(ExpenseResponse)
  post(@Body() request: ExpenseRequest, @CurrentUser() user: UserEntity) {
    const Expense: ExpenseEntity = {
      id: 0,
      ...request,
      userId: user.id,
    };
    return this.ExpenseService.create(Expense);
  }

  @Put("/:id")
  put(
    @Param("id") id: number,
    @Body() request: ExpenseRequest,
    @CurrentUser() user: UserEntity
  ): Promise<ExpenseResponse> {
    const Expense: ExpenseEntity = {
      id: 0,
      ...request,
      userId: user.id,
    };
    return this.ExpenseService.update(id, Expense);
  }

  @Delete("/:id")
  async remove(@Param("id") id: number): Promise<boolean> {
    await this.ExpenseService.delete(id);
    return true;
  }
}
