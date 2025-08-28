import { config } from 'dotenv';
import { IAuthService } from 'Interfaces/IServices/IAuthService';
import { IUserService } from 'Interfaces/IServices/IUserService';
import { AuthResponseDto } from './DTOs/AuthResponse.dto';
import { LoginDto } from './DTOs/Login.dto';
import { promisify } from 'util';
import {
  BadRequestException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/User/DTOs/createUser.dto';
import { User } from 'src/User/user.model';
import { Code, SERVICE_TOKENS, UserType } from 'shared/constants';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from 'shared/models/userToken.model';
import { hashSaltPassword } from 'shared/utils/hashPassword';
import { randomBytes, scrypt as _scrypt, verify } from 'crypto';

/**
 * Service handling user authentication operations
 * Manages login, registration, and password hashing
 */
config();
export class AuthService implements IAuthService {
  constructor(
    @Inject(SERVICE_TOKENS.IUserService)
    private readonly userService: IUserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(login: LoginDto): Promise<AuthResponseDto> {
    // Find user by email address
    const user = await this.userService.findOne({
      where: { email: login.email },
    });

    if (user) {
      // Verify password using stored salt and hash
      const scrypt = promisify(_scrypt);
      const [salt, Storedhash] = user.password.split('.');
      const hash = (await scrypt(login.password, salt!, 32)) as Buffer;

      if (Storedhash != hash.toString('hex')) {
        throw new BadRequestException({ message: 'Wrong credintials' });
      }

      // Create JWT payload with user info
      const payload: UserToken = {
        sub: user.id,
        type: user.userType,
        Approved: user.isApproved,
      };

      // Generate access token
      const token = await this.jwtService.signAsync(payload, {
        secret: process.env.secretKey || 'secretKey',
        expiresIn: '1h',
      });

      return { token: token };
    }

    throw new UnauthorizedException('Wrong credintials');
  }

  async register(signInDto: CreateUserDto): Promise<User> {
    const IsApproved = signInDto.userType == UserType.VENDOR ? false : true;
    // Check if email is already taken
    if (
      await this.userService.checkIFExists({
        where: { email: signInDto.email },
      })
    ) {
      throw new BadRequestException({ message: Code.EMAIL_USED });
    }

    const hashedPass = await hashSaltPassword(signInDto.password);
    signInDto.password = hashedPass;

    // Convert DTO to User entity and save

    return await this.userService.create({
      ...signInDto,
      isApproved: IsApproved,
    });
  }

  verifyToken(token: string): Promise<boolean> {
    // TODO: Implement token verification logic
    throw new Error('Method not implemented.');
  }
}
