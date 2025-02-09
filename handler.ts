import { Logger } from "@aws-lambda-powertools/logger";
const logger = new Logger({
  logLevel: "INFO",
  serviceName: "s3",
});

export const hello = async (event) => {
  return {
    body: "Lambda running success",
  };
};
