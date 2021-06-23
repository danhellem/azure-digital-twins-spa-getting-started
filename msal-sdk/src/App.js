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
  const [models, setModels] = useState(null);
  const [twins, setTwins] = useState(null);
  const name = accounts[0] && accounts[0].name;
  const request = {
    ...loginRequest,
    account: accounts[0],
  };  

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
    const api = new ApiService(instance, request);

    api.queryTwins("SELECT * FROM DIGITALTWINS").then(async (results) => {
      setTwins(results);
    });

    setModels(null);
  }

  return (
    <div style={{ margin: "20px" }}>
      <h3 className="card-title">Welcome {name}</h3>      
        <br></br>       
        <div>
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
