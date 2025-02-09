import { Logger } from "@aws-lambda-powertools/logger";

const logger = new Logger({
  logLevel: "INFO",
  serviceName: "s3",
});

export const receiver = async (event) => {
  logger.error(event);

  return {
    body: JSON.stringify({
      receiver: "receiver",
    }),
  };
};
