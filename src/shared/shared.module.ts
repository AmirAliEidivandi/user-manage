import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KafkaModule } from '@services/kafka/kafka.module';
import { UserEntity, UserSchema } from '@users/entities/user.entity';
import { SharedService } from './shared.service';

@Module({
  imports: [
    KafkaModule,
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  providers: [SharedService],
  exports: [SharedService, KafkaModule, MongooseModule],
})
export class SharedModule {}
