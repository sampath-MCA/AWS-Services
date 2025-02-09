
const url ="https://search-signalopensearch-5hsjbrnc7cob2l2gsryb4ubb7u.us-east-1.es.amazonaws.com";



const AWS = require('aws-sdk'); // V2 SDK.
const { Client } = require('@opensearch-project/opensearch');
const { AwsSigv4Signer } = require('@opensearch-project/opensearch/aws');

const client = new Client({
  ...AwsSigv4Signer({
    region: 'us-east-1',
    service: 'es',

    getCredentials: () =>
      new Promise((resolve, reject) => {
       AWS.config.getCredentials((err, credentials) => {
          if (err) {
            reject(err);
          } else {
            resolve(credentials);
          }
        });
      }),
  }),
  node: url, 
});
 export class esSearch {


public static async getFromElasticSearch(){
    var index_name = "books";

    var settings = {
      settings: {
        index: {
          number_of_shards: 2
        },
      },
    };
    
    var response = await client.indices.create({
      index: index_name,
      body: settings,
    });
    return response
}


}