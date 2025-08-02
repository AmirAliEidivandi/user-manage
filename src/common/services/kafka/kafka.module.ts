import { KafkaServiceConstants } from '@constants/kafka.constants';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

const clients = [
  {
    name: KafkaServiceConstants.PROFILE_SERVICE_NAME,
    clientId: KafkaServiceConstants.PROFILE_CLIENT_ID,
    groupId: KafkaServiceConstants.PROFILE_GROUP_ID,
  },
  {
    name: KafkaServiceConstants.TEST_PRISMA_SERVICE_NAME,
    clientId: KafkaServiceConstants.TEST_PRISMA_CLIENT_ID,
    groupId: KafkaServiceConstants.TEST_PRISMA_GROUP_ID,
  },
];

const items = [
  ClientsModule.registerAsync({
    clients: clients.map((client) => ({
      name: client.name,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: client.clientId,
              brokers: [
                `${configService.get<string>(
                  'KAFKA_HOST',
                )}:${configService.get<number>('KAFKA_PORT')}`,
              ],
              ...KafkaServiceConstants.CLIENT_OPTIONS,
            },
            consumer: {
              groupId: client.groupId,
              allowAutoTopicCreation: true,
            },
          },
        };
      },
      inject: [ConfigService],
    })),
  }),
];

@Global()
@Module({
  imports: [ConfigModule, ...items],
  providers: [],
  exports: [...items],
})
export class KafkaModule {}
