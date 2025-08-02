import { KafkaServiceConstants } from '@constants/kafka.constants';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(KafkaServiceConstants.TOPICS.CREATE_PROFILE)
  async createProfile(@Payload() payload: string) {
    return this.usersService.createProfile(payload);
  }

  @MessagePattern(KafkaServiceConstants.TOPICS.GET_ALL_PROFILES)
  async findAllProfile(@Payload() payload: string) {
    return this.usersService.findAllProfile(payload);
  }

  @MessagePattern(KafkaServiceConstants.TOPICS.GET_PROFILE)
  async findOneProfile(@Payload() payload: string) {
    return this.usersService.findOneProfile(payload);
  }

  @MessagePattern(KafkaServiceConstants.TOPICS.UPDATE_PROFILE)
  async updateProfile(@Payload() payload: string) {
    return this.usersService.updateProfile(payload);
  }
}
