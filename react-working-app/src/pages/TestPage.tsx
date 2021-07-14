import React from "react";

import { InteractiveBrowserCredential } from "@azure/identity";

import { adtContext, authConfig } from "../authConfig";
import { ApiService } from "../services/ApiService";
import { DigitalTwinsModelData } from "@azure/digital-twins-core";
import { Button } from "react-bootstrap";

interface Props {}

const _credential = new InteractiveBrowserCredential({
    tenantId: authConfig.tenantId,
    clientId: authConfig.clientId,
});

async function tokenSetRefresh(token: any, credential: InteractiveBrowserCredential, context: string) {
    let tmpTrToken: any = token;

    if (!tmpTrToken || tmpTrToken.expiresOnTimestamp < Date.now()) {
        tmpTrToken = await credential.getToken(context);
    }

    return tmpTrToken;
}

export class TestPage extends React.Component<Props, ITestPage> {
    state: ITestPage = {
      message: "", 
      token: null,
      models: null,
      twins: null, 
    };
  
    componentDidMount() {

    }

    private CallGetToken = async () => {
        const results = await tokenSetRefresh(this.state.token, _credential, adtContext);
        console.log(results);

        this.setState({ token: results.token });
    };
       
    // call getmodels api
    private CallGetModelsApi = () => {
        const api = new ApiService(_credential, adtContext);

        api.listModels().then(async (results: DigitalTwinsModelData[]) => {
            this.setState({ models: results, twins: null })
        });
    }
    
    // call gettwins api
    private CallGetTwinsApi = () => {
        const api = new ApiService(_credential, adtContext);

        api.queryTwins("SELECT * FROM DIGITALTWINS").then(async (results) => {
            this.setState({ twins: results, models: null, })
        });
    }

    render() {
        return (
            <div style={{ margin: "20px" }}>           
            {this.state.token ? (
              <div>
                <h5>Access Token Acquired!</h5>
                <p>{this.state.token}</p>
                <br />
                <br />
                <Button variant="secondary" onClick={(e: any) => this.CallGetModelsApi()}>
                  Get Models API
                </Button>
                &nbsp;&nbsp;
                <Button variant="secondary" onClick={(e: any) => this.CallGetTwinsApi()}>
                  Get Twins API
                </Button>
                <br />
                <br />
                {this.state.models ? (
                  <div>
                    <h2>Get Models</h2>
                    {this.state.models.map((x, key) => (
                      <div key={key}>
                        <span>{x.id}</span>
                        <br />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div></div>
                )}
                {this.state.twins ? (
                  <div>
                    <h2>Get Twins</h2>
                    {this.state.twins.map((x: any, key: any) => (
                      <div key={key}>
                        <span>{x.$dtId}</span>
                        <br />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ) : (
              <div>
                <Button variant="secondary" onClick={(e: any) => this.CallGetToken()}>
                  Request Access Token
                </Button>
              </div>
            )}
          </div>
        )
    }
}

export default TestPage;

export interface ITestPage {
  message: string;  
  token: any; 
  models: DigitalTwinsModelData[] | null;
  twins: [] | any;
}