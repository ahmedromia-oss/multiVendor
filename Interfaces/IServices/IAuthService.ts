import { AuthResponseDto } from 'src/Auth/DTOs/AuthResponse.dto';
import { LoginDto } from 'src/Auth/DTOs/Login.dto';
import { CreateUserDto } from 'src/User/DTOs/createUser.dto';
import { User } from 'src/User/user.model';

export interface IAuthService {
  login(login: LoginDto): Promise<AuthResponseDto>;
  register(signInDto: CreateUserDto): Promise<User>;
  verifyToken(token: string): Promise<boolean>;
}
