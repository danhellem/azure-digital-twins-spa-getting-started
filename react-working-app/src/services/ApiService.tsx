import { DigitalTwinModelsListResponse, DigitalTwinsClient, DigitalTwinsModelData, QueryQueryTwinsResponse } from "@azure/digital-twins-core";
import { AccessToken, DefaultHttpClient, TokenCredential, WebResourceLike } from "@azure/core-http";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { adtHost } from "../authConfig";
import { InteractiveBrowserCredential } from "@azure/identity";

const _adtHost: string = adtHost;

class CustomHttpClient {
  _client: DefaultHttpClient;

  constructor() {
    this._client = new DefaultHttpClient();
  }

  sendRequest(httpRequest: WebResourceLike) {
    const url = new URL(httpRequest.url);
    const baseUrl = new URL(window.location.origin);

    httpRequest.headers.set("x-adt-host", _adtHost);

    url.host = baseUrl.host;
    url.pathname = `/api/proxy${url.pathname}`;
    url.protocol = baseUrl.protocol;

    httpRequest.url = url.toString();

    return this._client.sendRequest(httpRequest);
  }
}

export class ApiService {
  _credential: InteractiveBrowserCredential;
  _context: any;
  _client: DigitalTwinsClient | undefined;
  _token: AccessToken | null;

  constructor(credential: InteractiveBrowserCredential, context: any) {
    this._credential = credential;
    this._context = context;
    this._client = undefined;
    this._token = null;
  }

  _tokenCredentials: TokenCredential = {
    getToken: async () => {      
      try {
        let tmpTrToken: AccessToken | null = this._token;   

        if (!tmpTrToken || tmpTrToken.expiresOnTimestamp < Date.now()) {
          tmpTrToken = await this._credential.getToken(this._context); 
        }       

        return tmpTrToken;              
      }
      catch (e) {
        console.log(`Error during acquireTokenSilent:`);
        console.log(e);    
        
        return null;
      }     
    }
  };

  async initialize() {
    const appAdtUrl = `https://${_adtHost}`;

    const httpClient: CustomHttpClient = new CustomHttpClient();
    this._client = new DigitalTwinsClient(appAdtUrl, this._tokenCredentials, { httpClient });
  }

  async listModels() {
    await this.initialize();

    const list = [];
    const models: PagedAsyncIterableIterator<DigitalTwinsModelData, DigitalTwinModelsListResponse> | undefined = this._client?.listModels([], true);
   
    if (models !== undefined) {
      for await (const model of models) {
        list.push(model);
      }
    }     

    return list;
  }

  async queryTwins(query: string) {
    await this.initialize();

    const list = [];
    const twins: PagedAsyncIterableIterator<any, QueryQueryTwinsResponse> | undefined = this._client?.queryTwins(query, 50);
    
    if (twins !== undefined) {
      for await (const twin of twins) {
        list.push(twin);
      }
    }

    return list;
  }  
}
