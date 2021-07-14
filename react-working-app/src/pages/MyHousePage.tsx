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

export class MyHousePage extends React.Component<Props, IMyHousePage> {
  state: IMyHousePage = {
    message: "",
    data: []
  };

  componentDidMount() {
    this.listFloorsAndRooms();
  }

  // refresh data by re-load twins
  private handleRefreshPage = () => {
    console.log("data refreshed");

    this.listFloorsAndRooms();
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

  public async listFloorsAndRooms() {
    const api = new ApiService(_credential, adtContext);
    const twinResult = await api.queryTwins(
      "SELECT * FROM digitaltwins WHERE IS_OF_MODEL('dtmi:com:hellem:dtsample:floor;1') OR IS_OF_MODEL('dtmi:com:hellem:dtsample:room;1')"
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
              <Row>
                <Col md={12} lg={9} sm={24}>
                  <div>
                    <h2>Floors</h2>
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
              <Row style={{ marginBottom: '40px' }}>
                {this.state.data.filter(d => d.model.includes('dtmi:com:hellem:dtsample:floor;1')).map((x, key) => (
                  <Col md={4} lg={3} sm={8} key={key} style={{ marginBottom: '20px' }}>
                    <Card style={{ width: '18rem' }}>
                      <Card.Header as="h5">{x.name}</Card.Header>
                      <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                          {x.temperature} °F
                          <br />
                          {x.humidity}% Humidity
                        </Card.Subtitle>                        
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
              <Row>
                <Col md={12} lg={9} sm={24}>
                  <div>
                    <h2>Rooms</h2>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginBottom: '20px' }}>
                {this.state.data.filter(d => d.model.includes('dtmi:com:hellem:dtsample:room;1')).map((x, key) => (
                  <Col md={4} lg={3} sm={8} key={key} style={{ marginBottom: '20px' }}>
                    <Card style={{ width: '18rem' }}>
                      <Card.Header as="h5">{x.name}</Card.Header>
                      <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                          {x.temperature} °F
                          <br />
                          {x.humidity}% Humidity
                        </Card.Subtitle>                        
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

export default MyHousePage;

export interface IMyHousePage {
  message: string;
  data: ITwinCore[];
}