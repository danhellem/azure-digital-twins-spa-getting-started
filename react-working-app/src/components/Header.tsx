import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Header = () => (
    <header className="App-header">      
      
        <div className="content">
          <div>
            <Container fluid>
              <Row style={{ marginBottom: '20px' }}>
                <Col md={2} lg={1} sm={2}>
                  <Link to="/">Test Page</Link>
                </Col>
                <Col md={2} lg={1} sm={2}>
                  <Link to="/generatedata">Generate Data</Link>
                </Col>
                <Col md={2} lg={1} sm={2}>
                  <Link to="/devices">Devices</Link>
                </Col>
                <Col md={2} lg={1} sm={2}>
                  <Link to="/myhouse">My House</Link>
                </Col>
              </Row>
            </Container>
          </div>
        </div>     
    </header>
)