
import { LoginDto } from 'src/Auth/DTOs/Login.dto';
import { CreateUserDto } from '../../src/User/DTOs/createUser.dto';
import { User } from '../../src/User/user.model';
import { AuthResponseDto } from 'src/Auth/DTOs/AuthResponse.dto';

/**
 * Interface for AuthResolver
 * Defines GraphQL operations for authentication
 */
export interface IAuthResolver {
  /**
   * Login mutation
   * @param loginDto Login credentials
   * @returns Authentication response with token
   */
  login(loginDto: LoginDto): Promise<AuthResponseDto>;

  /**
   * Register mutation
   * @param createUserDto User registration data
   * @returns Created user
   */
  register(createUserDto: CreateUserDto): Promise<User>;

  /**
   * Verify token query
   * @param token JWT token to verify
   * @returns Token validity status
   */
  verifyToken(token: string): Promise<boolean>;
}