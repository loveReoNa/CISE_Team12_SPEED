import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './schemas/user.schema';

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
  private useMemoryStorage = false;

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {
    // 检查MongoDB连接，如果失败则使用内存存储
    this.checkMongoConnection();
  }

  private async checkMongoConnection() {
    try {
      await this.userModel.findOne();
      console.log('MongoDB连接成功');
    } catch (error) {
      console.log('MongoDB连接失败，使用内存存储');
      this.useMemoryStorage = true;
    }
  }

  async register(username: string, email: string, password: string): Promise<{ message: string }> {
    // 使用内存存储
    if (this.useMemoryStorage) {
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

    // 使用MongoDB
    try {
      const existingUser = await this.userModel.findOne({
        $or: [{ email }, { username }],
      });
      if (existingUser) {
        throw new ConflictException('User with this email or username already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await this.userModel.create({
        username,
        email,
        password: hashedPassword,
      });

      return { message: 'User registered successfully' };
    } catch (error) {
      // 如果MongoDB操作失败，回退到内存存储
      this.useMemoryStorage = true;
      return this.register(username, email, password);
    }
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    // 使用内存存储
    if (this.useMemoryStorage) {
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

    // 使用MongoDB
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const token = this.jwtService.sign({ id: user._id, email: user.email });
      return { token };
    } catch (error) {
      // 如果MongoDB操作失败，回退到内存存储
      this.useMemoryStorage = true;
      return this.login(email, password);
    }
  }
}