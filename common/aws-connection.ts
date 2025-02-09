import { Connection } from '@opensearch-project/opensearch'
import * as AWS from 'aws-sdk'
import { ClientRequest, IncomingMessage, RequestOptions} from 'http';

const RequestSigner: any = require('aws-sdk/lib/signers/v4');

class AmazonConnection extends Connection {

    public request (
        params: RequestOptions,
        callback: (err:Error | null, response : IncomingMessage | null)=> void,
    ):ClientRequest{
        const signedParams = this.signParams(params);
        return super.request(signedParams, callback);
    }


    private signParams(param:any): RequestOptions {
        const region = AWS.config.region

        const endPoint = new AWS.Endpoint(this.url.href);
        const request = new AWS.HttpRequest(endPoint, region);

        request.method = params.method;
        request.path = params.queryString
        ?`${params.path}/?${params.queryString}`
        :params.path;
        request.body = params.body;
        request.headers = params.headers;
        request.headers.Host = endPoint.host;

        const signer = new RequestSigner(request,'es');
        signer.addAuthorization(AWS.config.credentials, new Date());
        return request;
    }
}

export { AmazonConnection }