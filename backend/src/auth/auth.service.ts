import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return null;
    }
    const isMatch = bcrypt.compareSync(pass, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user._doc.email, _id: user._doc._id, name: user._doc.name, _doc: user._doc };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async register(user: AuthRegisterDto): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);
    try {
      const u = await this.usersService.create(user);
      const { password, ...result } = u;
      return result;
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
