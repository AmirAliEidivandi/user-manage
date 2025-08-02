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
    console.log(payload);
    return this.usersService.createProfile(payload);
  }
}
