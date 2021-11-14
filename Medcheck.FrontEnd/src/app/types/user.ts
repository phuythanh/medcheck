import { BaseEntity } from './entity';

export interface UserResponse extends BaseEntity {
  email: string;
  password: string;
}

export interface UserRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  token: string;
  email: string;
}
