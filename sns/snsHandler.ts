
import pino from 'pino'

const options: pino.LoggerOptions={
  level:'debug',
  safe:true,
  timestamp:pino.stdTimeFunctions.isoTime
}
const logger:pino.Logger = pino(options)
export const snsNotification = async (event) => {
  var AWS = require("aws-sdk");
  AWS.config.update({ region: "us-east-1" });

var sns = new AWS.SNS();
var params = {
    Message:"This is my first sns text",
    TopicArn:"arn:aws:sns:us-east-1:575108959169:testing"
}
var response=null;
try {
  response= await sns.publish(params).promise();
  logger.info('success')

} catch (error) {
  logger.error(error);
  
}

return {
  
  body: JSON.stringify({
    response,
  }),

}
}


