import { Logger } from "@aws-lambda-powertools/logger";
const logger = new Logger({
  logLevel: "INFO",
  serviceName: "step function",
});
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
let stepfunctions = new AWS.StepFunctions();

export const startTimer = async (event, context, callback) => {
  logger.error("Start timer");

  try {
    var params = {
      stateMachineArn:'arn:aws:states:us-east-1:575108959169:stateMachine:timer',
      input: JSON.stringify({ name: "sampath" }),
    };

    await stepfunctions.startExecution(params).promise();

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Timer started",
      }),
    };
  
    callback(null, response);
  } catch (error) {
   
    callback(error);
  }
};

export const sendNotification = async (event, context, callback) => {
  logger.info(event);
  callback(null);
};
