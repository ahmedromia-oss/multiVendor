import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { IAuthResolver } from '../../Interfaces/IResolvers/IAuthResolver';
import { IAuthService } from '../../Interfaces/IServices/IAuthService';
import { AuthResponseDto } from './DTOs/AuthResponse.dto';
import { LoginDto } from './DTOs/Login.dto';
import { CreateUserDto } from '../User/DTOs/createUser.dto';
import { User } from '../User/user.model';
import { Inject, UseGuards } from '@nestjs/common';
import { GetUserDto } from 'src/User/DTOs/getUser.dto';
import { SERVICE_TOKENS } from 'shared/constants';

/**
 * GraphQL Resolver for authentication operations
 * Handles login, registration, and token verification
 */
@Resolver()
export class AuthResolver implements IAuthResolver {
  constructor(@Inject(SERVICE_TOKENS.IAuthService) private readonly authService: IAuthService) {}

  /**
   * Login mutation
   * Authenticates user with email and password
   */
  @Mutation(() => AuthResponseDto, {
    name: 'login',
   
  })
  async login(
    @Args('input', { type: () => LoginDto }) loginDto: LoginDto
  ): Promise<AuthResponseDto> {
    return await this.authService.login(loginDto);
  }

  /**
   * Register mutation
   * Creates new user account
   */
  @Mutation(() => GetUserDto, {
    name: 'register',
    description: 'Register new user account'
  })
  async register(
    @Args('input', { type: () => CreateUserDto }) createUserDto: CreateUserDto
  ): Promise<User> {
    return await this.authService.register(createUserDto);
  }

  /**
   * Verify token query
   * Validates JWT token
   */
  @Query(() => Boolean, {
    name: 'verifyToken',
    description: 'Verify JWT token validity'
  })
  async verifyToken(
    @Args('token', { type: () => String }) token: string
  ): Promise<boolean> {
    return await this.authService.verifyToken(token);
  }

  
}