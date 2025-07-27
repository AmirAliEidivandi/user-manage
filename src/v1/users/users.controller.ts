import { KafkaEventsMessagingEnum } from '@enum/kafka-events-messaging.enum';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@Controller({ path: 'users', version: '1' })
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(KafkaEventsMessagingEnum.CREATE_USER)
  async createUser(@Payload() payload: string) {
    return this.usersService.createUser(payload);
  }
}
