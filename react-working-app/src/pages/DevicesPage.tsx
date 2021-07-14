import React from "react";
import { Row, Col, Container, Card, Button } from "react-bootstrap";

import { InteractiveBrowserCredential } from "@azure/identity";

import { adtContext, authConfig } from "../authConfig";
import { ITwinCore } from "../interfaces/ITwin";
import { ApiService } from "../services/ApiService";
import { datetimeFormatter } from "../utils/dateFormatters";

interface Props { }

const _credential = new InteractiveBrowserCredential({
  tenantId: authConfig.tenantId,
  clientId: authConfig.clientId,
});

export class DevicesPage extends React.Component<Props, IDevicesPage> {
  state: IDevicesPage = {
    message: "",
    data: []
  };

  componentDidMount() {
    this.listDevices();
  }

  // refresh data by re-load twins
  private handleRefreshPage = () => {
    console.log("data refreshed");

    this.listDevices();
  };

  // function to check and compare the dates
  // used to check and see if lastUpdated has not been updated in 20 minutes, then highligh the device with a red style 
  private dateCheck = (date: Date, minutes: number = 20): boolean => {
    let today = new Date();
    let myDate = new Date(date);

    var diff = today.getTime() - myDate.getTime();
    var minsDiff = Math.floor(diff / (1000 * 60));

    if (minsDiff > minutes) return true;

    return false;
  }

  public async listDevices() {
    const api = new ApiService(_credential, adtContext);
    const twinResult = await api.queryTwins(
      "SELECT * FROM digitaltwins WHERE IS_OF_MODEL('dtmi:com:hellem:dtsample:sensor;1')"
    );

    var twinData: ITwinCore[] = twinResult.map((x) => {
      let twin: ITwinCore = {
        name: x.$dtId,
        model: x.$metadata.$model,
        temperature: Math.round(x.temperature),
        humidity: Math.round(x.humidity),
        lastUpdated: x.$metadata.humidity.lastUpdateTime
      };

      return twin;
    });

    this.setState({ data: twinData });
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
                {this.state.data.map((x: any, key: React.Key | null | undefined) => (
                  <Col md={4} lg={3} sm={8} key={key} style={{ marginBottom: '20px' }}>
                    <Card style={{ width: '18rem' }}>
                      <Card.Header as="h5">{x.name}</Card.Header>
                      <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                          {x.temperature} °F
                          <br />
                          {x.humidity}% Humidity</Card.Subtitle>
                      </Card.Body>
                      <Card.Footer><div>
                        <span style={this.dateCheck(x.lastUpdated, 20) ? { fontSize: 13, fontWeight: "bold", color: "red" } : { fontSize: 13 }}>
                          {datetimeFormatter(x.lastUpdated)}
                        </span>
                      </div>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        </div>
      </div>
    )
  }
}

export default DevicesPage;

export interface IDevicesPage {
  message: string;
  data: ITwinCore[];
}