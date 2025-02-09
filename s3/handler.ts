import {
    GetObjectCommand,
    NoSuchKey,
    S3Client,
    S3ServiceException,
  } from "@aws-sdk/client-s3";
  import { Logger } from "@aws-lambda-powertools/logger";
  
  const logger = new Logger({
    logLevel: "INFO",
    serviceName: "s3",
  });

  export const getObject = async () => {
    const client = new S3Client({});
  
    try {
      const response = await client.send(
        new GetObjectCommand({
          Bucket: 'sampath-demo',
          Key: "s3.pdf",
        }),
      );
      const str = await response?.Body?.transformToString();
      logger.info(`Record Data: ${str}`);
      return str;
    } catch (caught) {
      if (caught instanceof NoSuchKey) {
        logger.info(
          `Error from S3 while getting object "" from "". No such key exists.`,
        );
      } else if (caught instanceof S3ServiceException) {
        logger.info(
          `Error from S3 while getting object from .  ${caught.name}: ${caught.message}`,
        );
      } else {
        throw caught;
      }
    }
  };
  
  