/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/


// reactstrap components
import {
  Container,
  Row,
  Col,
  CardHeader,
  Card,
  Button,
  CardBody

} from "reactstrap";


import Header from "../components/Headers/Header.jsx";

const Index = () => {

  return (
    <>
      <Header />

      <Container className="mt--6" fluid>
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">AI감성 챗봇</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Settings
                    </Button>
                  </Col>
                </Row>
              </CardHeader>

              <CardBody>
              </CardBody>
            </Card>
      </Container>
    </>
  );
};

export default Index;
