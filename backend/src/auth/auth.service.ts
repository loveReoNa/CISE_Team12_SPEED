import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

// 内存存储作为备用方案
interface MemoryUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

const memoryUsers: MemoryUser[] = [];

@Injectable()
export class AuthService {
  private useMemoryStorage = true;

  constructor(
    private jwtService: JwtService,
  ) {
    console.log('使用内存存储进行用户认证');
  }

  async register(username: string, email: string, password: string): Promise<{ message: string }> {
    // 使用内存存储
    const existingUser = memoryUsers.find(user => user.email === email || user.username === username);
    if (existingUser) {
      throw new ConflictException('User with this email or username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    memoryUsers.push({
      _id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    });

    return { message: 'User registered successfully (memory storage)' };
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    // 使用内存存储
    const user = memoryUsers.find(u => u.email === email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id, email: user.email });
    return { token };
  }
}