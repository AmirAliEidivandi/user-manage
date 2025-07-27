import { KafkaEventsMessagingEnum } from '@enum/kafka-events-messaging.enum';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { KafkaService } from '@services/kafka/kafka.service';
import { decrypt } from '@utils/encryption.util';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserEntity>,
    private readonly kafkaService: KafkaService,
  ) {}

  async createUser(payload: string) {
    const createUserDto = decrypt(payload) as CreateUserDto;
    const user = new this.userModel({
      _id: randomUUID(),
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      birthDate: createUserDto.birthDate,
      nationalCode: createUserDto.nationalCode,
      requestId: createUserDto.requestId,
    });

    const createdUser = await user.save();

    await this.kafkaService.send(
      KafkaEventsMessagingEnum.CREATE_USER_RESPONSE,
      createdUser.toJSON(),
    );
  }
}
