import { Logger } from "@aws-lambda-powertools/logger";

const logger = new Logger({
  logLevel: "INFO",
  serviceName: "s3",
});

export const sender = async (event) => {
  var AWS = require("aws-sdk");
  AWS.config.update({ region: "us-east-1" });
  var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
  let statusCode: number = 200;
  let message: string;
  var params = {
    DelaySeconds: 10,
    MessageAttributes: {
      Title: {
        DataType: "String",
        StringValue: "java",
      },
      Author: {
        DataType: "String",
        StringValue: "somasundaram",
      }
    },
    MessageBody:
      "sqs message sent",
    QueueUrl: "https://sqs.us-east-1.amazonaws.com/575108959169/queueDemo",
  };
  logger.error("success");

  try {
    await sqs.sendMessage(params).promise();

    message = "Message placed in the Queue!";
  } catch (error) {
    logger.error(error);
    message = error;
    statusCode = 500;
  }
  return {
    statusCode,
    body: JSON.stringify({
      message,
    }),
  };
};
