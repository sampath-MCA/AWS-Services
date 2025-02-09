import { Logger } from "@aws-lambda-powertools/logger";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
  const logger = new Logger({
    logLevel: "INFO",
    serviceName: "dynamodb",
  });
  
import { v4 as uuidv4 } from "uuid";
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const dynamodbPut = async (event) => {
    logger.info(event)
  try{
    const command = new PutCommand({
        TableName: "solutionArch",
        Item: {
          archId:uuidv4(),
          service: ["kinesis",'dynamod','sqs','sns','opensearch','stepfunction','lambda'],
        },
      });
    
      const response = await docClient.send(command)
      logger.info('success');
      return response;
    }catch(error){
        logger.info(error);
    }
};

