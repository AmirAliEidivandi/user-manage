import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { decrypt, encrypt } from '@utils/encryption.util';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserEntity>,
  ) {}

  async createProfile(payload: string) {
    const createUserDto = decrypt(payload) as CreateUserDto;
    console.log(createUserDto);
    const user = new this.userModel({
      _id: randomUUID(),
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      birthDate: createUserDto.birthDate,
      email: createUserDto.email,
      nationalCode: createUserDto.nationalCode,
    });
    await user.save();
    return encrypt(user);
  }
}
