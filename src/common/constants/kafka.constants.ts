export namespace KafkaServiceConstants {
  export const USER_SERVICE_NAME = 'USER_SERVICE';
  export const USER_CLIENT_ID = 'user';
  export const USER_GROUP_ID = 'user-consumer';

  export const CLIENT_OPTIONS = {
    enforceRequestTimeout: false,
    retry: {
      initialRetryTime: 1000,
      retries: 20,
    },
  };
}
