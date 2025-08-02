import { KafkaEventsMessagingEnum } from '@enum/kafka-events-messaging.enum';

export namespace KafkaServiceConstants {
  export const PROFILE_SERVICE_NAME = 'PROFILE_SERVICE';
  export const PROFILE_CLIENT_ID = 'profile';
  export const PROFILE_GROUP_ID = 'profile-consumer';

  export const TEST_PRISMA_SERVICE_NAME = 'TEST_PRISMA_SERVICE';
  export const TEST_PRISMA_CLIENT_ID = 'test-prisma';
  export const TEST_PRISMA_GROUP_ID = 'test-prisma-consumer';

  export const CLIENT_OPTIONS = {
    enforceRequestTimeout: false,
    retry: {
      initialRetryTime: 1000,
      retries: 20,
    },
  };

  // Kafka Topics
  export const TOPICS = {
    CREATE_PROFILE: KafkaEventsMessagingEnum.CREATE_PROFILE,
    UPDATE_PROFILE: KafkaEventsMessagingEnum.UPDATE_PROFILE,
    DELETE_PROFILE: KafkaEventsMessagingEnum.DELETE_PROFILE,
    GET_PROFILE: KafkaEventsMessagingEnum.GET_PROFILE,
    GET_ALL_PROFILES: KafkaEventsMessagingEnum.GET_ALL_PROFILES,
    GET_PROFILE_BY_ID: KafkaEventsMessagingEnum.GET_PROFILE_BY_ID,
    GET_PROFILE_BY_EMAIL: KafkaEventsMessagingEnum.GET_PROFILE_BY_EMAIL,
    GET_PROFILE_BY_NATIONAL_CODE:
      KafkaEventsMessagingEnum.GET_PROFILE_BY_NATIONAL_CODE,
  } as const;
}
