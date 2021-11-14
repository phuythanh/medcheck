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

  @Get("/filter")
  @ResponseSchema(ExpenseResponse, { isArray: true })
  async filter(@CurrentUser() user: UserEntity) {
    const now = new Date();
    now.setDate(-30);
    now.setHours(0, 0, 0);
    return this.ExpenseService.findByUserAndDate(user, now);
  }

  @ResponseSchema(ExpenseResponse)
  @Get("/:id")
  getOne(@Param("id") id: number): Promise<ExpenseResponse> {
    return this.ExpenseService.findOne(id);
  }

  @Post("")
  @ResponseSchema(ExpenseResponse)
  post(@Body() request: ExpenseRequest, @CurrentUser() user: UserEntity) {
    const now = new Date();
    now.setHours(0, 0, 0);
    const Expense: ExpenseEntity = {
      id: 0,
      ...request,
      userId: user.id,
      date: now,
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
      date: new Date(),
    };
    return this.ExpenseService.update(id, Expense);
  }

  @Delete("/:id")
  async remove(@Param("id") id: number): Promise<boolean> {
    await this.ExpenseService.delete(id);
    return true;
  }
}
