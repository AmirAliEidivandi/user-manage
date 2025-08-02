import { Module } from '@nestjs/common';
import { KafkaModule } from '@services/kafka/kafka.module';
import { SharedModule } from '@shared/shared.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [SharedModule, KafkaModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
