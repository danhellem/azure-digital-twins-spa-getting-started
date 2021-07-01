import React, { useState } from "react";
import { InteractiveBrowserCredential } from "@azure/identity";
import { PageLayout } from "./components/PageLayout";
import Button from "react-bootstrap/Button";

import { ApiService } from "./services/ApiService";
import { authConfig, adtContext } from "./authConfig";

function ProfileContent() {  
  const [_token, setAccessToken] = useState(null);
  const [_models, setModels] = useState(null);
  const [_twins, setTwins] = useState(null);

  const _credential = new InteractiveBrowserCredential({ tenantId: authConfig.tenantId, clientId: authConfig.clientId});

  async function tokenSetRefresh(token, credential, context) {
    let tmpTrToken = token;
    
    if (!tmpTrToken || tmpTrToken.expiresOnTimestamp < Date.now()) {
      tmpTrToken = await credential.getToken(context);
    }

    return tmpTrToken;
  }  

  const CallGetToken = async() => {
    const results = await tokenSetRefresh(_token, _credential, adtContext);

    setAccessToken(results.token);  
  }
  

  // call getmodels api
  function CallGetModelsApi() {
    const api = new ApiService(_token);

    api.listModels().then(async (results) => {
      setModels(results.value);
    });

    setTwins(null);
  }

  // call gettwins api
  function CallGetTwinsApi() {
    const api = new ApiService(_token);

    api.queryTwins("SELECT * FROM DIGITALTWINS").then(async (results) => {
      setTwins(results.value);      
    });

    setModels(null);
  }

  return (
    <div style={{ margin: "20px" }}>
      <h3 className="card-title">Welcome</h3>
      {_token ? (
        <div>
          <h5>Access Token Acquired!</h5>          
          <p>{_token}</p>
          <br /><br />
          <Button variant="secondary" onClick={CallGetModelsApi}>
            Get Models API
          </Button>
          &nbsp;&nbsp;
          <Button variant="secondary" onClick={CallGetTwinsApi}>
            Get Twins API
          </Button>
          <br />
          <br />
          {_models ? (
            <div>
              <h2>Get Models</h2>
              {_models.map((x, key) => (
                <div key={key}>
                  <span>{x.id}</span>
                  <br />
                </div>
              ))}
            </div>
          ) : (
            <div></div>
          )}
          {_twins ? (
            <div>
              <h2>Get Twins</h2>
              {_twins.map((x, key) => (
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
          <Button variant="secondary" onClick={CallGetToken}>
            Request Access Token
          </Button>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <PageLayout>      
        <ProfileContent />      
    </PageLayout>
  );
}

export default App;
