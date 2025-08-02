import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { decrypt, encrypt } from '@utils/encryption.util';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  async findAllProfile(payload: string) {
    const { profileIds, page, limit, select } = decrypt(payload) as {
      profileIds: string[];
      page: number;
      limit: number;
      select: string[];
    };
    const users = await this.userModel
      .find({ _id: { $in: profileIds } })
      .select(select);
    const totalCount = await this.userModel.countDocuments({
      _id: { $in: profileIds },
    });
    const paginatedUsers = users.slice(page * limit, (page + 1) * limit);
    const response = {
      users: paginatedUsers,
      totalCount,
    };
    return encrypt(response);
  }

  async findOneProfile(payload: string) {
    const { id } = decrypt(payload) as { id: string };
    const user = await this.userModel.findById(id);
    return encrypt(user);
  }

  async updateProfile(payload: string) {
    const { id, updateProfileDto } = decrypt(payload) as {
      id: string;
      updateProfileDto: UpdateUserDto;
    };
    const user = await this.userModel.findByIdAndUpdate(id, updateProfileDto, {
      new: true,
      runValidators: true,
    });
    return encrypt(user);
  }
}
