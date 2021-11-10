import { IsEmail, IsNotEmpty } from "class-validator";
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
import { AuthService } from "../services/AuthService";
import { UserService } from "../services/UserService";

export class AuthResponse {
  public type: string;
  public token: string;
}

export class AuthRequest {
  @IsEmail()
  @IsNotEmpty()
  public email: string;
  @IsNotEmpty()
  public password: string;
}

// @Authorized()
@Service()
@JsonController("/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ResponseSchema(AuthResponse)
  @Post("/token")
  async post(@Body() request: AuthRequest) {
    const token = await this.authService.CreateToken(
      request.email,
      request.password
    );
    const result: AuthResponse = {
      token: token,
      type: "Bearer",
    };
    return result;
  }
}
