import { PutRecordCommand, KinesisClient } from "@aws-sdk/client-kinesis";
import { v4 as uuidv4 } from "uuid";
import { Logger } from "@aws-lambda-powertools/logger";

const logger = new Logger({
  logLevel: "INFO",
  serviceName: "kinesis-stream-handler-sample",
});

export const kinesisStream = async (event) => {
  const client = new KinesisClient({ region: "us-east-1" });
  var state;
  try {
    state = await client.send(
      new PutRecordCommand({
        StreamARN: "arn:aws:kinesis:us-east-1:575108959169:stream/DemoStream",
        Data: new Uint8Array(),
        PartitionKey: uuidv4(),
      })
    );
  } catch (caught) {
    state = caught;
    if (caught instanceof Error) {
    } else {
      throw caught;
    }
  }

  return {
    body: JSON.stringify({
      state,
    }),
  };
};
