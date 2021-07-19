import React from "react";
import { Row, Col, Container, Card, Button } from "react-bootstrap";

import { InteractiveBrowserCredential } from "@azure/identity";

import { adtContext, authConfig } from "../authConfig";
import { ApiService } from "../services/ApiService";
import { DigitalTwinsModelData } from "@azure/digital-twins-core";

interface Props { }

const _credential = new InteractiveBrowserCredential({
  tenantId: authConfig.tenantId,
  clientId: authConfig.clientId,
});

export class GenerateDataPage extends React.Component<Props, IGenerateDataPage> {
  state: IGenerateDataPage = {
    message: "",
    token: null,
    models: null,
    twins: null,
  };

  componentDidMount() {
    this.models();
    this.twins();
  }

  // refresh data by re-load twins
  private handleRefreshPage = () => {
    console.log("data refreshed");
  };

  public async twins() {
    const api = new ApiService(_credential, adtContext);

    api.queryTwins("SELECT * FROM DIGITALTWINS").then(async (results) => {
      this.setState({ twins: results })
    });
  }

  public async models() {
    const api = new ApiService(_credential, adtContext);

    api.listModels().then(async (results: DigitalTwinsModelData[]) => {
      this.setState({ models: results })
    });
  }

  render() {
    return (
      <div>
        <div className="content">
          <div>
            <Container fluid>
              <Row style={{ marginBottom: '20px' }}>
                <Col md={12} lg={9} sm={24}>
                  <div>
                    <h2>Devices</h2>
                  </div>
                </Col>
                <Col md={4} lg={3} sm={8}>
                  <div style={{ alignItems: 'center', verticalAlign: 'middle' }}>
                    <Button size="sm" variant="secondary"
                      onClick={(e: any) => this.handleRefreshPage()}
                    >
                      Refresh
                    </Button>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={4} lg={4} sm={12}>
                  {this.state.models ? (
                    <div>
                      <h2>Models</h2>
                      <table>
                        <tbody>
                        {this.state.models.map((x, key) => (
                        <tr key={key}>
                          <td>
                            {x.id}
                          </td>
                        </tr>
                        ))}
                        </tbody>
                      </table>                      
                    </div>
                  ) : (
                    <div></div>
                  )}
                </Col>
                <Col md={4} lg={4} sm={12}>
                  {this.state.twins ? (
                    <div>
                      <h2>Twins</h2>
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
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    )
  }
}

export default GenerateDataPage;

export interface IGenerateDataPage {
  message: string;
  token: any;
  models: DigitalTwinsModelData[] | null;
  twins: [] | any;
}