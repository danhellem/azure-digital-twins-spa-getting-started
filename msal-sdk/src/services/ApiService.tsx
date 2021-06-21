import { DigitalTwinModelsListResponse, DigitalTwinsClient, DigitalTwinsModelData } from "@azure/digital-twins-core";
import { DefaultHttpClient, TokenCredential, WebResourceLike } from "@azure/core-http";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

import { adtHost } from "../authConfig";

const _adtHost: string = adtHost;

class CustomHttpClient {
  _client: DefaultHttpClient;
  _token: string; 
  
  constructor(token: string) {
    this._client = new DefaultHttpClient();
    this._token = token;
  }

  sendRequest(httpRequest: WebResourceLike) {
    const url = new URL(httpRequest.url);
    const baseUrl = new URL(window.location.origin);
    
    httpRequest.headers.set("x-adt-host", _adtHost);
    httpRequest.headers.set("Authorization", `Bearer ${this._token}`);
      
    url.host = baseUrl.host;
    url.pathname = `/api/proxy${url.pathname}`;
    url.protocol = baseUrl.protocol;
    
    httpRequest.url = url.toString();

    return this._client.sendRequest(httpRequest);
  }
}

export class ApiService {
  _token: string;  
  _client: DigitalTwinsClient | undefined;
  
  constructor(token: string) {    
    this._token = token;    
    this._client = undefined;
  }

  async initialize() {
    const appAdtUrl = `http://${_adtHost}`;
     
    const tokenCredentials: TokenCredential = {
      getToken: async () => null
    };

    const httpClient: CustomHttpClient = new CustomHttpClient(this._token);
    this._client = new DigitalTwinsClient(appAdtUrl, tokenCredentials, { httpClient });    
  }

  async listModels() {
    await this.initialize();

    const list = [];
    const models: PagedAsyncIterableIterator<DigitalTwinsModelData, DigitalTwinModelsListResponse> | undefined = this._client?.listModels([], true);
    
    if (models !== undefined)
    {
      for await (const model of models) {
        list.push(model);
      }
    }

    return list;
  }    
}
