import React, { useState } from "react";
import { PageLayout } from "./components/PageLayout";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import Button from "react-bootstrap/Button";

import { ApiService } from "./services/ApiService";

function ProfileContent(props) {
  const { instance, accounts } = useMsal();
  const [accessToken, setAccessToken] = useState(null);
  const [models, setModels] = useState(null);
  const [twins, setTwins] = useState(null);
  const name = accounts[0] && accounts[0].name;
  const request = {
    ...loginRequest,
    account: accounts[0]
  };

  function RequestAccessToken() {
      // Silently acquires an access token which is then attached to a request for Microsoft Graph data
      instance.acquireTokenSilent(request).then((response) => {
          setAccessToken(response);
      }).catch((e) => {
          instance.acquireTokenPopup(request).then((response) => {
              setAccessToken(response);
          });
      });
  }

  // call getmodels api
  function CallGetModelsApi() {
      const api = new ApiService(instance, request);

      api.listModels().then(async (results) => {
          setModels(results);
      });

      setTwins(null);
  }

  // call gettwins api
  function CallGetTwinsApi() {
      const api = new ApiService(accessToken);

      api.queryTwins("SELECT * FROM DIGITALTWINS").then(async (results) => {
          setTwins(results.value);      
      });

      setModels(null);
  }

  return (
        <div style={{ margin: "20px" }}>
      <h3 className="card-title">Welcome {name}</h3>
      {accessToken ? (
      <div>
          <h5>Access Token Acquired!</h5>          
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
          {models ? (
            <div>
              <h2>Get Models</h2>
              {models.map((x, key) => (
              <div key={key}>
                  <span>{x.id}</span>
                  <br />
              </div>
              ))}
          </div>
          ) : (
          <div></div>
          )}
          {twins ? (
          <div>
              <h2>Get Twins</h2>
              {twins.map((x, key) => (
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
          <Button variant="secondary" onClick={RequestAccessToken}>
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
      <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>You are not signed in! Please sign in.</p>
      </UnauthenticatedTemplate>
    </PageLayout>
  );
}

export default App;
