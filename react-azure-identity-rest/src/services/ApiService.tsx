import { IModels } from '../interfaces/models.interface';
import { ITwins } from '../interfaces/twins.interface';
import { adtHost } from '../authConfig';

const _baseUrl: string = new URL(window.location.toString()).origin;
const _apiVersion: string = `2020-10-31`;
const _adtHost: string = adtHost;

export class ApiService {
  _token: string;
  
  constructor(token: string) {    
    this._token = token;    
  }

  async listModels(): Promise<IModels> {    
    try {
      const response = await fetch(
        `${_baseUrl}/api/proxy/models?api-version=${_apiVersion}`,
        {
          method: "get",
          headers: new Headers({           
            "x-adt-host": `${_adtHost}`,
            "Authorization": `Bearer ${this._token}`
          }),         
        }
      );
      
      const results = await Promise.resolve(response);     

      return await results.json();
    } catch (error) {
      return await Promise.reject(error);
    }
  };
  
  async queryTwins(query: string): Promise<ITwins> {  

    try {
      const response = await fetch(
        `${_baseUrl}/api/proxy/query?api-version=${_apiVersion}`,
        {
          method: "post",
          headers: new Headers({  
            "Content-Type": "application/json",         
            "x-adt-host": `${_adtHost}`,
            "Authorization": `Bearer ${this._token}`
          }), 
          body: JSON.stringify({ "query": `${query}` })                
        }
      );
      
      const results = await Promise.resolve(response);     

      return await results.json();
    } catch (error) {
      return await Promise.reject(error);
    }
  }

}
